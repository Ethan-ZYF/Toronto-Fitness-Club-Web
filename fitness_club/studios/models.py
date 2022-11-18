from django.db import models
from location_field.models.plain import PlainLocationField
from datetime import datetime, timedelta
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver


class Studio(models.Model):
    name = models.CharField(max_length=50,
                            blank=False,
                            null=False,
                            unique=True)
    address = models.CharField(max_length=50, blank=True, null=True)

    # longitude = models.FloatField(blank=False, null=False, default=0.0)
    # latitude = models.FloatField(blank=False, null=False, default=0.0)
    location = PlainLocationField(based_fields=['address'],
                                  zoom=7,
                                  default='POINT(0.0 0.0)')

    postcode = models.CharField(max_length=7, blank=False, null=False)
    phone_number = models.CharField(max_length=20, blank=False, null=False)

    # images = models.ManyToManyField(to=StudioImage, blank=True)

    def __str__(self):
        return self.name


class StudioImage(models.Model):
    image = models.ImageField(upload_to="studio_images",
                              blank=False,
                              null=False)
    studio = models.ForeignKey(to=Studio,
                               on_delete=models.CASCADE,
                               related_name="images")


class Amenity(models.Model):
    studio = models.ForeignKey(to=Studio,
                               on_delete=models.CASCADE,
                               related_name='amenities')
    type = models.CharField(max_length=50, blank=False, null=False)
    quantity = models.PositiveIntegerField(blank=False, null=False)


class Class(models.Model):
    studio = models.ForeignKey(Studio,
                               on_delete=models.CASCADE,
                               related_name='classes')
    name = models.CharField(max_length=50, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    capacity = models.IntegerField(blank=False, null=False)
    coach = models.CharField(max_length=50, blank=True, null=True)

    start_date = models.DateTimeField(blank=False, null=False)
    end_date = models.DateTimeField(blank=False, null=False)
    duration = models.PositiveIntegerField(blank=False, null=False)

    __prev_start_date = None
    __prev_end_date = None
    dates_changed = False

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__prev_start_date = self.start_date
        self.__prev_end_date = self.end_date

    def save(self, force_insert=False, force_update=False, *args, **kwargs):
        if self.__prev_start_date != self.start_date or self.__prev_end_date != self.end_date:
            self.dates_changed = True
        else:
            self.dates_changed = False
        super(Class, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.studio) + " " + self.name


class Event(models.Model):
    belonged_class = models.ForeignKey(Class,
                                       on_delete=models.CASCADE,
                                       related_name='events')
    start_time = models.DateTimeField(blank=False, null=False)
    studio = models.ForeignKey(Studio,
                               on_delete=models.CASCADE,
                               related_name='events',
                               editable=False)
    curr_capacity = models.PositiveBigIntegerField(default=0)

    def __str__(self) -> str:
        return str(self.belonged_class) + " " + self.start_time.strftime(
            "%Y-%m-%d %H:%M:%S")


@receiver(post_save, sender=Class)
def createEvents(sender, **kwargs):
    created = kwargs['created']
    instance = kwargs['instance']

    if instance.dates_changed:
        Event.objects.filter(belonged_class=instance.id).filter(
            start_time__gt=timezone.now()).delete()
        # create new future events
        curr = instance.start_date
        while curr < timezone.now():
            curr += timedelta(days=7)
        while curr < instance.end_date:
            e = Event(belonged_class=instance,
                      start_time=curr,
                      studio=instance.studio)
            e.save()
            print(e)
            curr += timedelta(days=7)


class Tag(models.Model):
    tag_name = models.CharField(max_length=50, blank=False, null=False)
    corresponding_class = models.ForeignKey(Class, on_delete=models.CASCADE)

    def __str__(self):
        return self.tag_name


class Loc(models.Model):
    latitude = models.FloatField(blank=False, null=False, default=0.0)
    longitude = models.FloatField(blank=False, null=False, default=0.0)

    def __str__(self):
        return str(self.lon) + "," + str(self.lat)


class StudioFilter(models.Model):
    studio_name = models.CharField(max_length=100)
    amenities = models.CharField(max_length=50)
    class_name = models.CharField(max_length=50)
    coach_name = models.CharField(max_length=50)