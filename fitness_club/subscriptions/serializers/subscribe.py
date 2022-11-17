from rest_framework import serializers
from subscriptions.models import Subscription, Plan
from django.db.utils import IntegrityError

class SubscribeSerializer(serializers.Serializer):
    class Meta:
        model = Subscription
        fields = ('plan',)
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['plan'] = serializers.PrimaryKeyRelatedField(queryset=Plan.objects.all())
    
    def create(self, validated_data):
        user = self.context['request'].user
        subscription = Subscription.objects.create(user=user, **validated_data)
        return subscription