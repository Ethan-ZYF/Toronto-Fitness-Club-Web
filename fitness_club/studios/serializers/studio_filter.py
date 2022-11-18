from rest_framework import serializers
from studios.models import Studio


class FilterChoiceSerializer(serializers.Serializer):
    studio_name = serializers.CharField(required=False)
    amenity = serializers.CharField(required=False)
    class_name = serializers.CharField(required=False)
    coach_name = serializers.CharField(required=False)

    class Meta:
        model = Studio
        fields = ('studio_name', 'amenities', 'class_name', 'coach_name')
