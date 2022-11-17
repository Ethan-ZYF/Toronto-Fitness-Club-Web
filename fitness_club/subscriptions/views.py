from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from subscriptions.serializers.plan import PlanSerializer
from subscriptions.serializers.subscribe import SubscribeSerializer
from django.contrib.auth import login, logout
from accounts.models import FCUser
from subscriptions.models import Plan
from rest_framework.renderers import AdminRenderer

# Create your views here.
class PlansView(ListAPIView):
    renderer_classes = [AdminRenderer]
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
        return Response({'detail': 'You have successfully enrolled.'})