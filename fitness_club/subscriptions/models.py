from django.db import models
from accounts.models import FCUser
from studios.models import Studio

# Create your models here.
PLAN_CHOICES = (
    ('MONTHLY', 'Monthly'),
    ('YEARLY', 'Yearly'),
)

class Plan(models.Model):
    gym = models.ForeignKey(to=Studio, on_delete=models.CASCADE, related_name='subscriptions')
    price = models.DecimalField(max_digits=6, decimal_places=2, blank=False, null=False, default=0.0)
    
    plan = models.CharField(max_length=50, choices=PLAN_CHOICES, default='YEARLY')


    def __str__(self):
        return f"{self.gym.name} - {self.plan}: ${self.price}"

class Subscription(models.Model):
    member = models.ForeignKey(to=FCUser, on_delete=models.CASCADE, related_name='subscriptions')
    plan = models.ForeignKey(to=Plan, on_delete=models.CASCADE, related_name='subscriptions')
    
    def __str__(self):
        return f"{self.member.username}/{str(self.plan)}"