from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView, ListAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from subscriptions.serializers.plan import PlanSerializer
from subscriptions.serializers.subscribe import SubscribeSerializer
from subscriptions.serializers.edit import EditSubSerializer
from django.contrib.auth import login, logout
from accounts.models import FCUser
from subscriptions.models import Plan, Subscription
# from rest_framework.renderers import AdminRenderer

# Create your views here.
class PlansView(ListAPIView):
    permission_classes = (IsAuthenticated,)
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
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # change user's is_subscribed to True
        request.user.is_subscribed = True
        print(request.user.is_subscribed)
        return Response({'detail': 'You have successfully enrolled.'})

class EditView(RetrieveAPIView, UpdateAPIView):
    serializer_class = EditSubSerializer
    permission_classes = (IsAuthenticated, )
    
    def get_object(self):
        try:
            return Subscription.objects.get(user=self.request.user)
        except Subscription.DoesNotExist:
            return None
    
class CancelView(DestroyAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = SubscribeSerializer
    
    def get_queryset(self):
        return Subscription.objects.filter(user=self.request.user)
        
    
    def delete(self, request, *args, **kwargs):
        if hasattr(request.user, 'subscription'):
            # delete from queryset
            self.get_queryset().delete()
            request.user.is_subscribed = False
            print(request.user.is_subscribed)
            return Response({'detail': 'You have successfully unsubscribed.'})
        return Response({'detail': 'You are not subscribed.'})
    
    def get(self, request, *args, **kwargs):
        # get current subscription
        if hasattr(request.user, 'subscription'):
            return Response({'detail': f'You are currently subscribed to {str(request.user.subscription)}.'})
        return Response({'detail': 'You are not subscribed.'})