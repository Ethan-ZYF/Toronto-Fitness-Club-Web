from datetime import datetime

from dateutil.relativedelta import relativedelta
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.dispatch import receiver
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
    # set default to one centry ago
    active_subscription = models.DateTimeField(default=datetime(2000, 1, 1))

    schedule = models.ManyToManyField(to='studios.Event',
                                      related_name="schedule_events")
    history = models.ManyToManyField(to='studios.Event',
                                     related_name="history_events")

    USERNAME_FIELD = 'username'


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
                            blank=False,
                            null=False,
                            default='MONTHLY')

    def __str__(self):
        return f"{self.plan} - {self.price}"


class Subscription(models.Model):
    user = models.OneToOneField(to='FCUser',
                                on_delete=models.CASCADE,
                                related_name='subscription')
    plan = models.ForeignKey(to=Plan,
                             on_delete=models.CASCADE,
                             related_name='subscriptions')
    start_date = models.DateField(default=datetime.now)

    def __str__(self):
        return f"{self.user.username} - {self.plan.plan}/{self.start_date.month}-{self.start_date.day}-{self.start_date.year}"


class Payment(models.Model):
    user = models.ForeignKey(to=FCUser,
                             on_delete=models.CASCADE,
                             related_name='payments')
    plan = models.ForeignKey(to=Plan,
                            on_delete=models.CASCADE,
                            related_name='payments')
    date = models.DateTimeField(default=datetime.now)
    
    card_info = models.CharField(max_length=50, default='****-****-****-****')

    # date = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.plan.price}"


@receiver(models.signals.post_save, sender=Subscription)
def create_payment(sender, instance, created, **kwargs):
    # create a payment for the subscription with the current date
    # change left to offset aware
    if instance and instance.start_date < instance.user.active_subscription.date():
        print("Already covered by active subscription") 
        return
    next_payment_date = instance.user.active_subscription
    # change next_payment_date to datetime with current time
    # get time of current timezone (new york)
    print("next_payment_date: ", next_payment_date)

    # next_payment_date -= relativedelta(hours=5)
    if (instance and instance.start_date == next_payment_date.date()):
        print('debug...................')
        return
    # combine instance date with current time
    payment_datetime = datetime.combine(instance.start_date, datetime.now().time())
    curr_payment = Payment.objects.create(user=instance.user,
                                          plan=instance.plan,
                                          date=payment_datetime,
                                          card_info=instance.user.credit_debit_no)
    curr_payment.save()
    instance.start_date = next_payment_date.date()
    instance.save()
