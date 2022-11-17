from django.contrib import admin
from django.urls import path
from .views import SignupView, LoginView, LogoutView, EditView, PaymentHistoryView, PayView, FuturePayView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('edit/', EditView.as_view(), name='edit'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('payments/', PaymentHistoryView.as_view(), name='payments'),
    path('pay/', PayView.as_view(), name='pay'),
    path('bill/', FuturePayView.as_view(), name='bill'),
    path("api/token/", TokenObtainPairView.as_view(),
         name="token_obtain_pair"),
]
