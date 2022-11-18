from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from location_field.models.plain import PlainLocationField
from studios.models import Loc

class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loc
        fields = ('latitude', 'longitude')
    
    def create(self, validated_data):
        return Loc.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.longitude = validated_data.get('longitude', instance.longitude)
        instance.latitude = validated_data.get('latitude', instance.latitude)
        instance.save()
        return instance

