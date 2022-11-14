from accounts.models import FCUser
from rest_framework import serializers
from django.core.validators import EmailValidator
from rest_framework.exceptions import ValidationError
import re

class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(required=True)
    username = serializers.CharField(required=True)
    
    class Meta:
        model = FCUser
        fields = ('username', 'first_name', 'last_name', 'email', 'avatar', 'password', 'password2')
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].required = False
        self.fields['first_name'].required = False
        self.fields['last_name'].required = False
    
    def create(self, data):
        currUser = FCUser.objects.create(
            username = data['username'],
            password = data['password'],
            email = data['email'],
            avatar = data['avatar'],
            first_name = data['first_name'],
            last_name = data['last_name']
        )
        currUser.set_password(data['password'])
        currUser.save()
        return currUser
    
    def validate_username(self, username):
        if FCUser.objects.filter(username=username).exists():
            raise ValidationError("Username already exists")
        return username
    
    def validate_password(self, password):
        if len(password) < 8:
            raise ValidationError("Password must be at least 8 characters long")
        # need to have one uppercase, one lowercase, one number, and one special character
        regex = re.compile('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$')
        if not regex.match(password):
            raise ValidationError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
        return password

    def validate_password2(self, password2):
        if password2 != self.initial_data['password']:
            raise ValidationError("Passwords do not match")
        return password2