from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.utils import timezone
from studios.models import Studio
from django.dispatch import receiver
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta


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
    # set to false and cannot be changed by admin
    active_subscription = models.BooleanField(default=False)
    
    schedule = models.ManyToManyField(to='studios.Event', related_name="schedule_events")
    history = models.ManyToManyField(to='studios.Event', related_name="history_events")

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
                            blank=True,
                            null=True)

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
    subscription = models.ForeignKey(to='Subscription',
                                     on_delete=models.CASCADE,
                                     related_name='payments')
    date = models.DateTimeField(default=datetime.now)
    # date = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.subscription.plan.price}"


@receiver(models.signals.post_save, sender=Subscription)
def create_payment(sender, instance, created, **kwargs):
    # create a payment for the subscription with the current date
    print("current time zone time: ", timezone.localtime())
    print("ZONE:", timezone.localdate(timezone=timezone.get_current_timezone()))
    print("current instance time: ", instance.start_date)
    if instance.start_date > timezone.localdate():
        print("HHHHHHHAHSHSHAHSHD")
        return
    next_payment_date = instance.start_date
    # change next_payment_date to datetime with current time
    # get time of current timezone (new york)
    print("next_payment_date: ", next_payment_date)

    # next_payment_date -= relativedelta(hours=5)
    next_payment_date = timezone.datetime.combine(next_payment_date, timezone.localtime().time())
    curr_payment = Payment.objects.create(user=instance.user,
                                          subscription=instance,
                                          date=next_payment_date)
    curr_payment.save()
    if instance.plan.plan == 'MONTHLY':
        next_payment_date += relativedelta(months=1)
    else:
        next_payment_date += relativedelta(years=1)
    # change start_date of subscription to next_payment_date
    instance.start_date = next_payment_date.date()
    instance.save()