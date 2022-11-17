from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from subscriptions.serializers.plan import PlanSerializer
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
    

class EnrollView(CreateAPIView):
    pass