from django.contrib import admin
from .models import Subscription, Plan

# Register your models here.
admin.site.register(Subscription)
admin.site.register(Plan)