from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from location_field.models.plain import PlainLocationField
from studios.models import Studio, StudioImage, Amenity


class ListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Studio
        fields = ('name', 'address', 'location', 'postcode', 'phone_number')