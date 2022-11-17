from rest_framework import serializers
from subscriptions.models import Plan

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ['price', 'plan']