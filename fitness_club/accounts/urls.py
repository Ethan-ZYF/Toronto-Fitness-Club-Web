from django.contrib import admin
from django.urls import path
from .views import SignupView, LoginView, LogoutView, EditView, PaymentHistoryView, PayView, FuturePayView, PlansView, SubscribeView, EditView, CancelView, EditPlanView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('edit/', EditView.as_view(), name='edit'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('payments/', PaymentHistoryView.as_view(), name='payments'),
    path('pay/', PayView.as_view(), name='pay'),
    path('bill/', FuturePayView.as_view(), name='bill'),
    path('plans/', PlansView.as_view(), name='plans'),
    path('subscribe/', SubscribeView.as_view(), name='subscribe'),
    path('subscribe/<int:pk>/', SubscribeView.as_view(), name='subscribe'),
    path('edit-plan/', EditPlanView.as_view(), name='edit_plan'),
    path('cancel/', CancelView.as_view(), name='cancel'),
    path("api/token/", TokenObtainPairView.as_view(),
         name="token_obtain_pair"),
]
