from rest_framework import serializers
from studios.models import Studio


class ListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='studio-detail')

    class Meta:
        model = Studio
        fields = ('id', 'name', 'address', 'location', 'postcode',
                  'phone_number', 'url')
