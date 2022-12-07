from accounts.models import Subscription, Plan
from dateutil.relativedelta import relativedelta
from django.utils import timezone
from rest_framework import serializers


class EditSubSerializer(serializers.ModelSerializer):
    new_start_date = serializers.SerializerMethodField('get_new_start_date')
    current_plans = serializers.SerializerMethodField('get_current_plans')

    def get_new_start_date(self, obj):
        curr_subscription = Subscription.objects.get(
            user=self.context['request'].user)
        start_date = curr_subscription.start_date
        prev_plan = curr_subscription.plan.plan
        while start_date <= timezone.now().date():
            if prev_plan == 'MONTHLY':
                start_date += relativedelta(months=1)
            else:
                start_date += relativedelta(years=1)
        return start_date
    
    def get_current_plans(self, obj):
        return Plan.objects.all().values()

    class Meta:
        model = Subscription
        fields = ('new_start_date', 'plan', 'current_plans')
        read_only_fields = ('new_start_date', 'current_plans')

    def validate(self, data):
        # check if the user has the field subscription
        if not hasattr(self.context['request'].user, 'subscription'):
            raise serializers.ValidationError('You have not subscribed yet.')
        return data

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['plan'] = serializers.PrimaryKeyRelatedField(
            queryset=Plan.objects.all())

    def update(self, instance, validated_data):
        user = self.context['request'].user
        curr_subscription = Subscription.objects.get(user=user)
        curr_subscription.plan = validated_data['plan']
        curr_subscription.start_date = self.get_new_start_date(
            curr_subscription)
        curr_subscription.save()
        return curr_subscription
