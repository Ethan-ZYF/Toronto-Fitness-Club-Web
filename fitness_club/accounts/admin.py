from django.contrib import admin
from accounts.models import FCUser, Payment
from subscriptions.models import Subscription


class SubscriptiontInline(admin.TabularInline):
    model = Subscription
    readonly_fields = ('plan', 'start_date')
    
    def has_add_permission(self, request, obj):
        return False

    def has_delete_permission(self, request, obj):
        return False


class PaymentInline(admin.TabularInline):
    model = Payment
    # cannot change the payment details
    readonly_fields = ('subscription', 'date')

    def has_add_permission(self, request, obj):
        return False


class FCUserAdmin(admin.ModelAdmin):
    model = FCUser
    inlines = [SubscriptiontInline, PaymentInline]


# Register your models here.
admin.site.register(FCUser, FCUserAdmin)