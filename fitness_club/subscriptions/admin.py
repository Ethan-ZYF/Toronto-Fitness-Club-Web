from django.contrib import admin
from .models import Subscription, Plan
from rest_framework.exceptions import ValidationError
from django.contrib import messages


def validate_only_one_month_and_one_year(obj):
    month_cnt = Plan.objects.filter(plan='MONTHLY').count()
    year_cnt = Plan.objects.filter(plan='YEARLY').count()
    if obj.plan == 'MONTHLY' and month_cnt >= 1:
        raise ValidationError("Monthly plan already exists")
    if obj.plan == 'YEARLY' and year_cnt >= 1:
        raise ValidationError("Yearly plan already exists")


# https://stackoverflow.com/questions/52503131/django-admin-remove-default-save-message
class RemoveAdminDefaultMessageMixin:

    def remove_default_message(self, request):
        storage = messages.get_messages(request)
        try:
            del storage._queued_messages[-1]
        except KeyError:
            pass
        return True

    def response_add(self, request, obj, post_url_continue=None):
        """override"""
        response = super().response_add(request, obj, post_url_continue)
        self.remove_default_message(request)
        return response

    def response_change(self, request, obj):
        """override"""
        response = super().response_change(request, obj)
        self.remove_default_message(request)
        return response

    def response_delete(self, request, obj_display, obj_id):
        """override"""
        response = super().response_delete(request, obj_display, obj_id)
        self.remove_default_message(request)
        return response


class PlanAdmin(RemoveAdminDefaultMessageMixin, admin.ModelAdmin):

    def save_model(self, request, obj, form, change):
        try:
            validate_only_one_month_and_one_year(obj)
        except ValidationError as e:
            # messages.error(request, e.args[0])
            # self.message_user(request, message)
            self.message_user(request, e.args[0], level=messages.ERROR)
            return
        super().save_model(request, obj, form, change)


admin.site.register(Plan, PlanAdmin)
admin.site.register(Subscription)