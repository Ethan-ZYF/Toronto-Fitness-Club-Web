from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from studios.models import Studio
from studios.serializers.studio_detail import StudioSerializer


class StudiosDetailView(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = Studio.objects.all()
    serializer_class = StudioSerializer
