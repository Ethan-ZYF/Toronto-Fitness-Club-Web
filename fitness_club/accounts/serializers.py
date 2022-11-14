from .models import FCUser
from rest_framework import serializers

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