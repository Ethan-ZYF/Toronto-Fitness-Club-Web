from accounts.models import Subscription, Plan
from django.utils import timezone
from rest_framework import serializers
from datetime import datetime


class SubscribeSerializer(serializers.Serializer):
    class Meta:
        model = Subscription
        fields = ('plan', 'start_date',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['plan'] = serializers.PrimaryKeyRelatedField(queryset=Plan.objects.all())
        self.fields['start_date'] = serializers.DateField(datetime.now().date())

    def create(self, validated_data):
        user = self.context['request'].user
        subscription = Subscription.objects.create(user=user, plan=validated_data['plan'], start_date=validated_data['start_date'])
        print(f'created subscription: {subscription}')
        return subscription
