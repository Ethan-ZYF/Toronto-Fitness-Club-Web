from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.utils import timezone


class FCUser(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=200)

    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(max_length=254, blank=True, null=True)
    phone_number = models.CharField(max_length=50, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars', blank=True, null=True)
    is_admin = models.BooleanField(default=False)
    credit_debit_no = models.CharField(max_length=50, blank=True, null=True)

    USERNAME_FIELD = 'username'


class Payment(models.Model):
    user = models.ForeignKey(to=FCUser,
                             on_delete=models.CASCADE,
                             related_name='payments')
    subscription = models.ForeignKey(to='subscriptions.Subscription',
                                     on_delete=models.CASCADE,
                                     related_name='payments')
    date = models.DateTimeField(default=timezone.now)
    # date = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.subscription.plan.price}"