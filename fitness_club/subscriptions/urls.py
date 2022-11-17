from django.urls import path
from subscriptions.views import PlansView, SubscribeView, EditView, CancelView

urlpatterns = [
    path('plans/', PlansView.as_view(), name='plans'),
    path('subscribe/', SubscribeView.as_view(), name='subscribe'),
    path('subscribe/<int:pk>/', SubscribeView.as_view(), name='subscribe'),
    path('edit/', EditView.as_view(), name='edit'),
    path('cancel/', CancelView.as_view(), name='cancel'),
]
