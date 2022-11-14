from accounts.models import FCUser
from rest_framework import serializers
from django.contrib.auth import authenticate


class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,
                                     style={'input_type': 'password'})
    class Meta:
        model = FCUser
        fields = ['username', 'password']
        extra_kwargs = {'username':{'validators':[]}}

    def validate(self, data):
        username = data['username']
        password = data['password']
        currUser = authenticate(username=username, password=password)
        if currUser is None:
            raise serializers.ValidationError("Invalid username or password")
        data['user'] = currUser
        return data

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].required = True
        self.fields['password'].required = True
