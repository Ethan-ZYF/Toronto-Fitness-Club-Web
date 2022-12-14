from datetime import datetime
from accounts.models import Payment, Subscription, Plan
from accounts.serializers.edit import EditSerializer
from accounts.serializers.edit_plan import EditSubSerializer
from accounts.serializers.login import LoginSerializer
from accounts.serializers.payments import PaymentHistorySerializer, CreatePaymentSerializer
from accounts.serializers.plan import PlanSerializer
from accounts.serializers.subscribe import SubscribeSerializer
from accounts.serializers.user import UserSerializer
from dateutil.relativedelta import relativedelta
from django.contrib.auth import login, logout
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView, ListAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


# Create your views here.
class SignupView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        return Response("Welcome to the signup page")

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response("User created successfully")


class LoginView(CreateAPIView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        return Response("Welcome to the login page")

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        login(request, serializer.validated_data['user'])
        return Response("User logged in successfully")


class EditView(RetrieveAPIView, UpdateAPIView):
    serializer_class = EditSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

class ProfileView(RetrieveAPIView):
    serializer_class = EditSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

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
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)


class PayView(CreateAPIView):
    serializer_class = CreatePaymentSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        return Response("Pay here")

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response(e.detail['non_field_errors'][0])
        serializer.save()
        return Response("Payment successful")


class FuturePayView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        if not hasattr(request.user, 'subscription'):
            return Response({'future_payments': []})
        reversed_payments = Payment.objects.filter(user=request.user).order_by('-date')
        if (len(reversed_payments) == 0):
            return Response({'future_payments': []})
        response = []
        response.append({
            'amount': request.user.subscription.plan.price,
            'card_info': request.user.credit_debit_no,
            'date_and_time': request.user.active_subscription.strftime("%m/%d/%Y %H:%M:%S")
        })
        return Response({'future_payments': response}) 
        


class PlansView(ListAPIView):
    permission_classes = (AllowAny,)
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class SubscribeView(CreateAPIView):
    serializer_class = SubscribeSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        return Response({'detail': 'Please choose a plan to enroll.'})

    def post(self, request, *args, **kwargs):
        # check if the user has the field subscription
        if hasattr(request.user, 'subscription'):
            return Response({'detail': 'You have already subscribed.'})
        sub_end_date = datetime.now()
        if request.user.active_subscription.date() < sub_end_date.date():
            plan_id = request.data['plan']
            if Plan.objects.get(id=plan_id).plan == 'MONTHLY':
                sub_end_date += relativedelta(months=1)
            else:
                sub_end_date += relativedelta(years=1)
            request.user.active_subscription = sub_end_date - relativedelta(hours=5)
        else:
            sub_end_date = request.user.active_subscription
        request.user.save()
        print(request.user.active_subscription)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # change the user's subscription field to True
        return Response({'detail': 'You have successfully enrolled.'})


class EditPlanView(RetrieveAPIView, UpdateAPIView):
    serializer_class = EditSubSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        try:
            return Subscription.objects.get(user=self.request.user)
        except Subscription.DoesNotExist:
            return None


class CancelView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = SubscribeSerializer

    def get_queryset(self):
        return Subscription.objects.filter(user=self.request.user)
    
    def delete(self, request, *args, **kwargs):
        if hasattr(request.user, 'subscription'):
            # delete from queryset
            self.get_queryset().delete()
            # reset to default value (one century ago)
            # request.user.active_subscription = datetime(2000, 1, 1)
            # delete all the user's events in schedule that are later than start date
            request.user.save()
            # request.user.schedule.filter(
            #     start_time__gt=request.user.active_subscription).delete()
            # print(request.user.schedule.all())
            # request.user.save()
            return Response({
                'detail':
                    f'You have unsubscribed, expire_date: {request.user.subscription.start_date}.'
            })
        return Response({'detail': 'You are not subscribed.'})

    def get(self, request, *args, **kwargs):
        # get current subscription
        if hasattr(request.user, 'subscription'):
            my_plan = request.user.subscription
            return Response({
                'plan': my_plan.plan.plan,
                'id': my_plan.plan.id,
                'price': my_plan.plan.price,
                'expire_date': request.user.active_subscription
            })
        return Response({'detail': 'You are not subscribed.'})
