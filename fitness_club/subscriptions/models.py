from django.db import models
from studios.models import Studio
from django.utils import timezone
from accounts.models import Payment
from django.dispatch import receiver

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
    start_date = models.DateField(default=timezone.now)

    def __str__(self):
        return f"{self.user.username} - {self.plan.plan}/{self.start_date.month}-{self.start_date.day}-{self.start_date.year}"


@receiver(models.signals.post_save, sender=Subscription)
def create_payment(sender, instance, created, **kwargs):
    # create a payment for the subscription with the current date
    curr_payment = Payment(user=instance.user,
                            subscription=instance,
                            date=timezone.now())   
    curr_payment.save()