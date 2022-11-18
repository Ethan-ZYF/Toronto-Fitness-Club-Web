from accounts.models import Subscription, Plan
from django.utils import timezone
from rest_framework import serializers


class SubscribeSerializer(serializers.Serializer):
    class Meta:
        model = Subscription
        fields = ('plan', 'start_date',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['plan'] = serializers.PrimaryKeyRelatedField(queryset=Plan.objects.all())
        print("lalalala", timezone.localdate(timezone=timezone.get_current_timezone()))
        self.fields['start_date'] = serializers.DateField(
            default=timezone.localdate(timezone=timezone.get_current_timezone()))

    def create(self, validated_data):
        user = self.context['request'].user
        subscription = Subscription.objects.create(user=user, **validated_data)
        return subscription
