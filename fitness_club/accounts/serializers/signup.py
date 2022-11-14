from fitness_club.accounts.models import FCUser
from rest_framework import serializers


class SignupSerializer(serializers.ModelSerializer):
    def __init__(self):
        pass
