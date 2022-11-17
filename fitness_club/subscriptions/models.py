from django.db import models
from accounts.models import FCUser
from studios.models import Studio
from django.utils import timezone
from rest_framework.exceptions import ValidationError

# Create your models here.
PLAN_CHOICES = (
    ('MONTHLY', 'Monthly'),
    ('YEARLY', 'Yearly'),
)

PLAN_CHOICE_MONTHLY = (('MONTHLY', 'Monthly'),)

PLAN_CHOICE_YEARLY = (('YEARLY', 'Yearly'),)

def validate_only_one_month_and_one_year(obj):
    month_cnt = Plan.objects.filter(plan='MONTHLY').count()
    year_cnt = Plan.objects.filter(plan='YEARLY').count()
    if obj.plan == 'MONTHLY' and month_cnt >= 1:
        raise ValidationError("Monthly plan already exists")
    if obj.plan == 'YEARLY' and year_cnt >= 1:
        raise ValidationError("Yearly plan already exists")

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
    
    def clean(self):
        try:
            validate_only_one_month_and_one_year(self)
        except ValidationError:
            pass
    
    def __str__(self):
        return f"{self.plan} - {self.price}"


class Subscription(models.Model):
    user = models.OneToOneField(to=FCUser,
                                on_delete=models.CASCADE,
                                related_name='subscription')
    plan = models.ForeignKey(to=Plan,
                             on_delete=models.CASCADE,
                             related_name='subscriptions')

    def __str__(self):
        return f"{self.user.username} - {self.plan.plan}"