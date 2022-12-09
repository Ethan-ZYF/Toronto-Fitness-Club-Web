import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "fitness_club.settings")
import django

django.setup()
from accounts.models import FCUser, Payment
from dateutil.relativedelta import relativedelta
from django.utils import timezone

users = FCUser.objects.filter(subscription__isnull=False)
print(users)
need_payment = []
for user in users:
    print(user.subscription.plan.plan)
    if user.subscription.plan.plan == "MONTHLY":
        # print(user)
        if user.subscription.start_date + relativedelta(
                months=1) <= timezone.now().date():
            need_payment.append(user)
    elif user.subscription.plan.plan == "YEARLY":
        if user.subscription.start_date + relativedelta(
                years=1) <= timezone.now().date():
            need_payment.append(user)
print(need_payment)

for user in need_payment:
    Payment.objects.create(
        user=user,
        subscription=user.subscription,
        date=timezone.now(),
    )
print("All Paid")
