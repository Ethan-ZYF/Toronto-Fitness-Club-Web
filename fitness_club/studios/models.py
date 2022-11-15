from django.db import models
from location_field.models.plain import PlainLocationField



class Studio(models.Model):
    name = models.CharField(max_length=50,
                            blank=False,
                            null=False,
                            unique=True)
    address = models.CharField(max_length=50, blank=True, null=True)

    longitude = models.FloatField(blank=False, null=False, default=0.0)
    latitude = models.FloatField(blank=False, null=False, default=0.0)

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





class Class(models.Model):
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    capacity = models.IntegerField(blank=False, null=False)

    start_time = models.DateTimeField(blank=False, null=False)
    end_time = models.DateTimeField(blank=False, null=False)

    def __str__(self):
        return str(self.studio) + self.name


class Tag(models.Model):
    tag_name = models.CharField(max_length=50, blank=False, null=False)
    corresponding_class = models.ForeignKey(Class, on_delete=models.CASCADE)

    def __str__(self):
        return self.tag_name