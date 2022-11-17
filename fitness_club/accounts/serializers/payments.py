from accounts.models import FCUser, Payment
from rest_framework import serializers
from django.contrib.auth import authenticate

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'user', 'subscription', 'date']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['user'].required = True
        self.fields['subscription'].required = True
        self.fields['date'].required = True