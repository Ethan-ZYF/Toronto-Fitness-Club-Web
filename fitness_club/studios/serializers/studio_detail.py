from rest_framework import serializers
from studios.models import Studio, StudioImage, Amenity, Class, Event
from datetime import datetime, timedelta
from django.utils.http import urlencode

from django.utils import timezone

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('time')

class ClassSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True, read_only=True)
    class Meta:
        model = Class
        fields = ('name', 'description','curr_capacity', 'capacity', 'duration', 'events')


class StudioSerializer(serializers.ModelSerializer):
    direction_link = serializers.SerializerMethodField('get_direction_link')
    classes = ClassSerializer(many=True, read_only=True)
    # schedule = serializers.SerializerMethodField('order_class')

    def get_direction_link(self, studio):
        return "https://www.google.com/maps/dir/?api=1&"+urlencode({'destination':studio.address})

    # def order_class(self, studio)
    class Meta:
        model = Studio
        fields = ('name', 'address', 'location', 'postcode', 'phone_number', 'direction_link', 'classes')
