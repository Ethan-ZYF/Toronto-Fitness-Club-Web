from rest_framework import serializers
from studios.models import Studio, StudioImage, Amenity, Class, Event
from datetime import datetime, timedelta
from django.utils.http import urlencode

from django.utils import timezone

class FilteredEventsSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.filter(start_time__gt=timezone.now())
        return super(FilteredEventsSerializer, self).to_representation(data)

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ("start_time",)
        list_serializer_class = FilteredEventsSerializer

class EventDetailsSerializer(serializers.ModelSerializer):
    class_name = serializers.CharField(source='belonged_class.name')
    class_length_in_hour = serializers.CharField(source='belonged_class.duration')
    class Meta:
        model = Event
        fields = ("start_time","class_name", "class_length_in_hour")
        list_serializer_class = FilteredEventsSerializer

class ClassSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True, read_only=True)
    class Meta:
        model = Class
        fields = ('name', 'description','curr_capacity', 'capacity', 'duration', 'events')


class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ('type', 'quantity')
        
class StudioImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudioImage
        fields = ('image',)

class StudioSerializer(serializers.ModelSerializer):
    direction_link = serializers.SerializerMethodField('get_direction_link')
    classes = ClassSerializer(many=True, read_only=True)
    event_set = serializers.SerializerMethodField()
    amenities = AmenitySerializer(many=True, read_only=True)

    def get_event_set(self, instance):
        events = instance.events.all().order_by('-start_time')
        return EventDetailsSerializer(events, many=True).data

    def get_direction_link(self, studio):
        return "https://www.google.com/maps/dir/?api=1&"+urlencode({'destination':studio.address})

    class Meta:
        model = Studio
        fields = ('name', 'address', 'location', 'postcode', 'phone_number', 'direction_link', 'classes', 'event_set', 'amenities', 'images')

