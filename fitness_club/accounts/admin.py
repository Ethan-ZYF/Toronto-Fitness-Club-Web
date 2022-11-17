from django.contrib import admin
from .models import FCUser, Subscription, Payment


class SubscriptiontInline(admin.TabularInline):
    model = Subscription
    
class PaymentInline(admin.TabularInline):
    model = Payment
    
class FCUserAdmin(admin.ModelAdmin):
    model = FCUser
    inlines = [SubscriptiontInline, PaymentInline]

# Register your models here.
admin.site.register(FCUser, FCUserAdmin)