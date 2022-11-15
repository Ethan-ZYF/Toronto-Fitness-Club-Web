from rest_framework import generics
from studios.models import Studio
from studios.serializers.studio_detail import StudioSerializer

from rest_framework.permissions import IsAuthenticated, AllowAny

class StudiosDetailView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Studio.objects.all()
    serializer_class = StudioSerializer
