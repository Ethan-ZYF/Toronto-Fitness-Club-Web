from accounts.models import FCUser
from django.utils import timezone
from django.utils.http import urlencode
from rest_framework import serializers
from studios.models import Studio, StudioImage, Amenity, Class, Event


class FilteredEventsSerializer(serializers.ListSerializer):

    def to_representation(self, data):
        print(data)
        data = data.filter(start_time__gt=timezone.now())
        return super(FilteredEventsSerializer, self).to_representation(data)


class FilteredHistoryEventsSerializer(serializers.ListSerializer):

    def to_representation(self, data):
        data = data.filter(start_time__lte=timezone.now())
        return super(FilteredHistoryEventsSerializer, self).to_representation(data)


class EventSerializer(serializers.ModelSerializer):
    class_name = serializers.CharField(source='belonged_class.name')
    class_length_in_hour = serializers.CharField(
        source='belonged_class.duration')
    class_capacity = serializers.IntegerField(source='belonged_class.capacity')
    start_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Event
        fields = ('id', "start_time", "class_name", "class_length_in_hour",
                  "curr_size", 'class_capacity')
        list_serializer_class = FilteredEventsSerializer


class EventDetailsSerializer(serializers.ModelSerializer):
    class_name = serializers.CharField(source='belonged_class.name')
    class_length_in_hour = serializers.CharField(
        source='belonged_class.duration')
    class_capacity = serializers.IntegerField(source='belonged_class.capacity')
    start_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Event
        fields = ('id', "start_time", "class_name", "class_length_in_hour",
                  "curr_size", 'class_capacity')
        list_serializer_class = FilteredEventsSerializer


class HistoryEventDetailsSerializer(serializers.ModelSerializer):
    class_name = serializers.CharField(source='belonged_class.name')
    class_length_in_hour = serializers.CharField(
        source='belonged_class.duration')
    start_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Event
        fields = ('id', "start_time", "class_name", "class_length_in_hour",
                  "curr_size")
        list_serializer_class = FilteredHistoryEventsSerializer


class ClassSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True, read_only=True)
    tags = serializers.SerializerMethodField()
    
    def get_tags(self, obj):
        return obj.tags.all().values_list('tag_name', flat=True)

    class Meta:
        model = Class
        fields = ('id', 'name', 'description', 'tags', 'coach', 'capacity', 'duration',
                  'events')


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
    images = StudioImageSerializer(many=True, read_only=True)

    def get_event_set(self, instance):
        events = instance.events.all().order_by('start_time')
        return EventDetailsSerializer(events, many=True).data

    def get_direction_link(self, studio):
        return "https://www.google.com/maps/dir/?api=1&" + urlencode(
            {'destination': studio.location})

    class Meta:
        model = Studio
        fields = ('id', 'name', 'address', 'location', 'postcode',
                  'phone_number', 'direction_link', 'classes', 'event_set',
                  'amenities', 'images')


class HistoryEventDetailsSerializer(serializers.ModelSerializer):
    class_name = serializers.CharField(source='belonged_class.name')
    class_length_in_hour = serializers.CharField(
        source='belonged_class.duration')

    class Meta:
        model = Event
        fields = ("id", "start_time", "class_name", "class_length_in_hour",
                  "curr_size")
        list_serializer_class = FilteredHistoryEventsSerializer


class ScheduleSerializer(serializers.ModelSerializer):
    schedule = EventDetailsSerializer(many=True, read_only=True)

    class Meta:
        model = FCUser
        fields = ['schedule']


class HistorySerializer(serializers.ModelSerializer):
    history = HistoryEventDetailsSerializer(many=True, read_only=True)

    class Meta:
        model = FCUser
        fields = ['history']
