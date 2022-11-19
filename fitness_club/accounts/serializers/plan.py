from accounts.models import Plan
from rest_framework import serializers


class PlanSerializer(serializers.ModelSerializer):
    # url to subscribe page
    url = serializers.HyperlinkedIdentityField(view_name='subscribe')

    class Meta:
        model = Plan
        fields = ['id', 'price', 'plan', 'url']
