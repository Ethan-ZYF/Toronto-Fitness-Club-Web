from rest_framework import generics
from studios.models import Studio
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from studios.serializers.studio_detail import StudioSerializer, EventSerializer
from datetime import datetime, timedelta
from django.utils import timezone


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
            queryset = queryset.filter(amenities__type__icontains=target_amenities)
        if target_class_name:
            queryset = queryset.filter(classes__name__icontains=target_class_name)
        if target_coach_name:
            queryset = queryset.filter(classes__coach__icontains=target_coach_name)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class FilterStudioScheduleView(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]
    search_fields = ['username', 'email']

    def list(self, request, pk):
        queryset = self.get_queryset()
        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        # name, coach name, date, and time range.
        try:
            studio = Studio.objects.get(id=self.kwargs['pk'])
        except Studio.DoesNotExist:
            return Response("Error: this studio does not exist!")

        queryset = studio.events.filter(start_time__gt=timezone.now())

        class_name = self.request.query_params.get('class_name')
        if class_name is not None:
            queryset = queryset.filter(belonged_class__name=class_name)

        coach_name = self.request.query_params.get('coachname')
        if coach_name is not None:
            queryset = queryset.filter(belonged_class__coach=coach_name)

        date = self.request.query_params.get('date')
        if date is not None:
            date = datetime.date(self.request.query_params.get('date'))
            queryset = queryset.filter(start_time__date=date)

        time_begin = self.request.query_params.get('time_begin')
        time_end = self.request.query_params.get('time_end')
        if time_begin is not None:
            time_begin = datetime.time(self.request.query_params.get('time_begin'))
            queryset = queryset.filter(start_time__time__lt=time_begin)
        if time_end is not None:
            time_end = datetime.time(self.request.query_params.get('time_end'))
            queryset = queryset.filter(start_time__time__gt=time_end - timedelta(hours=belonged_class__duration))

        return queryset
