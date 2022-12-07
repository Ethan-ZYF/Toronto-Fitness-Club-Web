from datetime import datetime

from accounts.models import Payment
from dateutil.relativedelta import relativedelta
from rest_framework import serializers


class PaymentHistorySerializer(serializers.ModelSerializer):
    amount = serializers.SerializerMethodField('get_amount')
    card_info = serializers.SerializerMethodField('get_card_info')
    date_and_time = serializers.DateTimeField(source='date', read_only=True, format="%d/%m/%Y %H:%M:%S")

    def get_amount(self, obj):
        return obj.plan.price

    def get_card_info(self, obj):
        return obj.user.credit_debit_no

    def get_date_and_time(self, obj):
        return obj.date.strftime("%d/%m/%Y %H:%M:%S")

    class Meta:
        model = Payment
        fields = ['amount', 'card_info', 'date_and_time']
        read_only_fields = ['amount', 'card_info', 'date_and_time']


class CreatePaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['user', 'plan', 'date']
        read_only_fields = ['user', 'plan', 'date']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def validate(self, attrs):
        today = datetime.today().date()
        if not hasattr(self.context['request'].user, 'subscription'):
            raise serializers.ValidationError("You don't have a subscription now!")
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
        plan = self.context['request'].user.subscription.plan
        date = datetime.today().date()
        payment = Payment.objects.create(user=user,
                                         plan=plan,
                                         date=date)
        return payment
