from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from location_field.models.plain import PlainLocationField
from studios.models import Studio, StudioImage, Amenity

from django.utils.http import urlencode

class StudioSerializer(serializers.ModelSerializer):
    direction_link = serializers.SerializerMethodField('get_direction_link')

    def get_direction_link(self, studio):
        return "https://www.google.com/maps/dir/?api=1&"+urlencode({'destination':studio.address})

    class Meta:
        model = Studio
        fields = ('name', 'address', 'location', 'postcode', 'phone_number', 'direction_link')