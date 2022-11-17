from rest_framework import serializers
from subscriptions.models import Plan

class PlanSerializer(serializers.ModelSerializer):
    # url to subscribe page
    url = serializers.HyperlinkedIdentityField(view_name='subscribe')
    
    class Meta:
        model = Plan
        fields = ['price', 'plan', 'url']