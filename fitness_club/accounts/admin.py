from django.contrib import admin
from accounts.models import FCUser, Payment
from subscriptions.models import Subscription


class SubscriptiontInline(admin.TabularInline):
    model = Subscription
    
class PaymentInline(admin.TabularInline):
    model = Payment
    # cannot change the payment details
    readonly_fields = ('subscription', 'date')
    
class FCUserAdmin(admin.ModelAdmin):
    model = FCUser
    inlines = [SubscriptiontInline, PaymentInline]

# Register your models here.
admin.site.register(FCUser, FCUserAdmin)