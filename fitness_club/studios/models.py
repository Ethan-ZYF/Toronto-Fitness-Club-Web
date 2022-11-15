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
    studio = models.ForeignKey(to=Studio, on_delete=models.CASCADE)


class Amenity(models.Model):
    studio = models.ForeignKey(to=Studio, on_delete=models.CASCADE)
    type = models.CharField(max_length=50, blank=False, null=False)
    quantity = models.PositiveIntegerField(blank=False, null=False)

class Class(models.Model):
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE, related_name='classes')
    name = models.CharField(max_length=50, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    capacity = models.IntegerField(blank=False, null=False)

    start_date = models.DateTimeField(blank=False, null=False)#blank=False, null=False
    end_date = models.DateTimeField(blank=False, null=False) #blank=False, null=False
    duration = models.PositiveIntegerField(blank=False, null=False)

    curr_capacity = models.PositiveBigIntegerField(default=capacity)

    def __str__(self):
        return str(self.studio) + " " + self.name


@receiver(post_save, sender=Class)
def createEvents(sender, **kwargs):
    # create all valid events based on sender's start and end dates 
    # handle differently if time is changed, should destroy all previous associated events and create a series of new ones

        # def save(self, *args, **kwargs):
    #     pk = self.pk
    #     # create associated events upon creating new class
    #     if not self.pk: 
    #         curr = self.start_date
    #         while curr < timezone.now():
    #             curr = curr + timedelta(days = 7)
    #         while curr < self.end_date:
    #             e=Event(belonged_class=self.id, time=curr)
    #             e.save()
    #             curr = curr + timedelta(days = 7)

    #     super(Class, self).save(*args, **kwargs)
    return





class Event(models.Model):
    belonged_class = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='events')
    time = models.DateTimeField(blank=False, null=False)


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