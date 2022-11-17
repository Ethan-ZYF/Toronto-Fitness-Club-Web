from django.urls import path
from subscriptions.views import PlansView

urlpatterns = [
    path('plans/', PlansView.as_view(), name='plans'),
]
