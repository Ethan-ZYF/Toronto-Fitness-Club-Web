from django.db import models

# from location_field.models.plain import PlainLocationField


# Create your models here.
# A studio has a name, address, geographical location, postal code, phone number, and a set of images.
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


class Class(models.Model):
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE)