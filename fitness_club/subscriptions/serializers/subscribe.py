from rest_framework import serializers
from subscriptions.models import Subscription, Plan
from django.db.utils import IntegrityError
from django.utils import timezone

class SubscribeSerializer(serializers.Serializer):
    class Meta:
        model = Subscription
        fields = ('plan', 'start_date',)
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['plan'] = serializers.PrimaryKeyRelatedField(queryset=Plan.objects.all())
        self.fields['start_date'] = serializers.DateField(default=timezone.now)
    
    def create(self, validated_data):
        user = self.context['request'].user
        subscription = Subscription.objects.create(user=user, **validated_data)
        return subscription