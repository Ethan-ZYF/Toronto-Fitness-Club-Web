from django.contrib import admin
from .models import Subscription, Plan
from rest_framework.exceptions import ValidationError


admin.site.register(Plan)
admin.site.register(Subscription)