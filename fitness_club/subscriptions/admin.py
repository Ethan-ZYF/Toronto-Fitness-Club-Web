from django.contrib import admin
from .models import Subscription, Plan


# Register your models here.
class PlanAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        monthly = Plan.objects.filter(plan='MONTHLY').count()
        yearly = Plan.objects.filter(plan='YEARLY').count()
        if monthly >= 1 and yearly >= 1:
            return False
        else:
            return True


admin.site.register(Plan, PlanAdmin)
admin.site.register(Subscription)