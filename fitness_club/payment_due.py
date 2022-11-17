import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "fitness_club.settings")
import django

django.setup()
from accounts.models import FCUser, Payment
from subscriptions.models import Subscription, Plan
from dateutil.relativedelta import relativedelta

users = FCUser.objects.filter(subscription__isnull=False)
# print(users)
need_payment = []
for user in users:
    if user.subscription.plan == "MONTHLY":
        print(user)
        if user.subscription.start_date + relativedelta(
                months=1) <= datetime.date.today():
            need_payment.append(user)
    elif user.subscription.plan == "YEARLY":
        if user.subscription.start_date + relativedelta(
                years=1) <= datetime.date.today():
            need_payment.append(user)
print(need_payment)

for user in need_payment:
    Payment.objects.create(
        user=user,
        amount=user.subscription.plan.price,
        date=datetime.date.today(),
    )
print("All Paid")