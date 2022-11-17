from accounts.models import FCUser, Payment
from rest_framework import serializers
from django.contrib.auth import authenticate
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta


class PaymentHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment
        fields = ['id', 'user', 'subscription', 'date']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['user'].required = True
        self.fields['subscription'].required = True
        self.fields['date'].required = True


class CreatePaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment
        fields = ['user', 'subscription', 'date']
        read_only_fields = ['user', 'subscription', 'date']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def validate(self, attrs):
        today = datetime.today().date()
        # print(today, "debug")
        start_date = self.context['request'].user.subscription.start_date
        print(start_date, "debug")
        plan = self.context['request'].user.subscription.plan.plan
        if start_date > today:
            print("start date is in the future")
            raise serializers.ValidationError("Your subscription has already covered this period")
        while start_date < today:
            if plan == 'MONTHLY':
                start_date += relativedelta(months=1)
            else:
                start_date += relativedelta(years=1)
        if start_date > today:
            print(start_date)
            raise serializers.ValidationError("No Payment Due")
        payments = Payment.objects.filter(user=self.context['request'].user)
        last_payment = payments.last()
        if last_payment == None:
            return attrs
        if last_payment.date == today:
            raise serializers.ValidationError("Payment Already Made")
        return attrs

    def create(self, validated_data):
        user = self.context['request'].user
        subscription = self.context['request'].user.subscription
        date = datetime.today().date()
        payment = Payment.objects.create(user=user,
                                         subscription=subscription,
                                         date=date)
        return payment