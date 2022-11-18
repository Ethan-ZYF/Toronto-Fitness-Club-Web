from rest_framework import generics
from studios.models import Studio
from rest_framework import filters
from studios.serializers.studio_filter import FilterChoiceSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from studios.models import Amenity, Class
from rest_framework.response import Response
from studios.serializers.studio_detail import StudioSerializer

class StudioFilterView(generics.ListAPIView):
    serializer_class = StudioSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        queryset = Studio.objects.all()
        target_name = self.request.query_params.get('name', None)
        target_amenities = self.request.query_params.get('amenities', None)
        target_class_name = self.request.query_params.get('class_name', None)
        target_coach_name = self.request.query_params.get('coach_name', None)
        if target_name:
            queryset = queryset.filter(name__icontains=target_name)
        if target_amenities:
            queryset = queryset.filter(amenities__name__icontains=target_amenities)
        if target_class_name:
            queryset = queryset.filter(classes__name__icontains=target_class_name)
        if target_coach_name:
            queryset = queryset.filter(classes__coach__name__icontains=target_coach_name)
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)