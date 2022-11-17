from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.renderers import AdminRenderer, JSONRenderer, BrowsableAPIRenderer
from accounts.serializers.login import LoginSerializer
from accounts.serializers.user import UserSerializer
from accounts.serializers.edit import EditSerializer
from accounts.serializers.payments import PaymentHistorySerializer, CreatePaymentSerializer
from django.contrib.auth import login, logout
from accounts.models import FCUser, Payment
from dateutil.relativedelta import relativedelta
from datetime import datetime, timedelta


# Create your views here.
class SignupView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )

    def get(self, request, *args, **kwargs):
        return Response("Welcome to the signup page")

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response("User created successfully")


class LoginView(CreateAPIView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny, )

    def get(self, request, *args, **kwargs):
        return Response("Welcome to the login page")

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        login(request, serializer.validated_data['user'])
        return Response("User logged in successfully")


class EditView(RetrieveAPIView, UpdateAPIView):
    serializer_class = EditSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self):
        return self.request.user


class LogoutView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        return Response("Logout here")

    def post(self, request, *args, **kwargs):
        try:
            request.user.auth_token.delete()
        except AttributeError:
            pass
        logout(request)
        return Response("User logged out successfully")


class PaymentHistoryView(ListAPIView):
    serializer_class = PaymentHistorySerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)


class PayView(CreateAPIView):
    serializer_class = CreatePaymentSerializer
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        return Response("Pay here")

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            if e == "No Payment Due":
                return Response("No Payment Due")
            else:
                return Response("Payment Already Made")
        serializer.save()
        return Response("Payment successful")