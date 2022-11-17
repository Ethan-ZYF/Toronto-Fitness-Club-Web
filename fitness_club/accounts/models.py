from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from studios.models import Event

class FCUser(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)

    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(max_length=254)
    phone_number = models.CharField(max_length=50, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars', blank=True, null=True)
    is_admin = models.BooleanField(default=False)
    credit_debit_no = models.CharField(max_length=50)

    schedule = models.ManyToManyField(Event, related_name="schedule_events")
    history = models.ManyToManyField(Event, related_name="history_events")
    
    USERNAME_FIELD = 'username'