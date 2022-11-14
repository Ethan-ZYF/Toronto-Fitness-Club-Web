from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin


class FCUser(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)

    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(max_length=254)
    avatar = models.ImageField(upload_to='avatars', blank=True, null=True)
    is_admin = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []