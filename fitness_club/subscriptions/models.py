from django.db import models
from studios.models import Studio
from django.utils import timezone
from rest_framework.exceptions import ValidationError

# Create your models here.
PLAN_CHOICES = (
    ('MONTHLY', 'Monthly'),
    ('YEARLY', 'Yearly'),
)




class Plan(models.Model):
    price = models.DecimalField(max_digits=6,
                                decimal_places=2,
                                blank=False,
                                null=False,
                                default=0.0)
    plan = models.CharField(max_length=50,
                            choices=PLAN_CHOICES,
                            blank=True,
                            null=True)
    
    def __str__(self):
        return f"{self.plan} - {self.price}"


class Subscription(models.Model):
    user = models.OneToOneField(to='accounts.FCUser',
                                on_delete=models.CASCADE,
                                related_name='subscription')
    plan = models.ForeignKey(to=Plan,
                             on_delete=models.CASCADE,
                             related_name='subscriptions')

    def __str__(self):
        return f"{self.user.username} - {self.plan.plan}"