from accounts.models import FCUser
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
import re

class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = FCUser
        fields = ('username', 'first_name', 'last_name', 'email', 'phone_number', 'avatar', 'password', 'password2')
        extra_kwargs = {
            'username': {'validators': []},
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].required = False
        self.fields['phone_number'].required = False
        self.fields['first_name'].required = False
        self.fields['last_name'].required = False
        self.fields['avatar'].required = False
    
    def create(self, data):
        currUser = FCUser.objects.create(
            username = data['username'],
            password = data['password'],
            email = "" if 'email' not in data else data['email'],
            phone_number = "" if 'phone_number' not in data else data['phone_number'],
            avatar = "" if 'avatar' not in data else data['avatar'],
            first_name = "" if 'first_name' not in data else data['first_name'],
            last_name = "" if 'last_name' not in data else data['last_name'],
        )
        currUser.set_password(data['password'])
        currUser.save()
        return currUser
    
    def update(self, instance, validated_data):
        currUser = self.context['request'].user
        if currUser.pk != instance.pk:
            raise ValidationError("You do not have permission to edit this user")
        print(validated_data)
        if 'username' in  validated_data and validated_data['username'] != self.initial_data['username']:
            instance.username = validated_data['username']
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        if 'email' in validated_data:
            instance.email = validated_data['email']
        if 'phone_number' in validated_data:
            instance.phone_number = validated_data['phone_number']
        if 'first_name' in validated_data:
            instance.first_name = validated_data['first_name']
        if 'last_name' in validated_data:
            instance.last_name = validated_data['last_name']
        if 'avatar' in validated_data:
            instance.avatar = validated_data['avatar']
        instance.save()
        return instance
    
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

    def validate_phone_number(self, phone_number):
        regex = re.compile('^\d{3}-\d{3}-\d{4}$')
        if not regex.match(phone_number):
            raise ValidationError("Phone number must be in the format XXX-XXX-XXXX")
        return phone_number