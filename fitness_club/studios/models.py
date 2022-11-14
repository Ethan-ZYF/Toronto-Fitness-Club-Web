from django.db import models
# from location_field.models.plain import PlainLocationField


# Create your models here.
# A studio has a name, address, geographical location, postal code, phone number, and a set of images.
class Studio(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    location = PlainLocationField(based_fields=['address'], zoom=7)