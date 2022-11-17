from rest_framework import serializers
from subscriptions.models import Subscription, Plan
from django.db.utils import IntegrityError
from django.utils import timezone
from dateutil.relativedelta import relativedelta

class SubscribeSerializer(serializers.Serializer):
    class Meta:
        model = Subscription
        fields = ('plan', 'start_date',)
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['plan'] = serializers.PrimaryKeyRelatedField(queryset=Plan.objects.all())
        self.fields['start_date'] = serializers.DateField(default=timezone.now().date())
    
    def create(self, validated_data):
        user = self.context['request'].user
        # subscription = Subscription.objects.create(user=user, **validated_data)
        if validated_data['plan'] == 'MONTHLY':
            validated_data['start_date'] += relativedelta(months=1)
        else:
            validated_data['start_date'] += relativedelta(years=1)
        subscription = Subscription.objects.create(user=user, **validated_data)
        return subscription