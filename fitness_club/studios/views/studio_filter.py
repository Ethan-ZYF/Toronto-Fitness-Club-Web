from rest_framework import generics
from studios.models import Studio, Event
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from studios.serializers.studio_detail import StudioSerializer, EventSerializer
from datetime import datetime, timedelta
from django.utils import timezone
from django.db.models import F


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

    def list(self, request, pk):
        try:
            studio = Studio.objects.get(id=self.kwargs['pk'])
        except Studio.DoesNotExist:
            return Response("Error: this studio does not exist!")

        fdate = self.request.query_params.get('date')
        if fdate is not None:
            try:
                fdate = datetime.strptime(fdate, "%Y-%m-%d") 
            except ValueError as e:
                return Response("Error: date filter has to be passed in format: year-month-day in valid numbers! e.g. 2022-11-08")

        time_begin = self.request.query_params.get('time_begin')
        time_end = self.request.query_params.get('time_end')
        
        if time_begin is not None:
            try:
                time_begin = datetime.strptime(time_begin, "%H:%M:%S")
            except ValueError as e:
                return Response("Error: time begin filter has to be passed in format: hour:time:second in valid numbers! e.g. 09:15:32")

        if time_end is not None:
            try:
                time_end = datetime.strptime(time_end, "%H:%M:%S")
            except ValueError as e:
                return Response("Error: time end filter has to be passed in format: hour:time:second in valid numbers! e.g. 09:15:32")

        queryset = self.get_queryset()
        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data)

    def get_queryset(self):

        studio = Studio.objects.get(id=self.kwargs['pk'])
        queryset = studio.events.filter(start_time__gt=timezone.now())

        class_name = self.request.query_params.get('class_name')
        if class_name is not None:
            queryset = queryset.filter(belonged_class__name__icontains=class_name)

        coach_name = self.request.query_params.get('coach_name')
        if coach_name is not None:
            queryset = queryset.filter(belonged_class__coach__icontains=coach_name)

        fdate = self.request.query_params.get('date')
        if fdate is not None:
            fdate = datetime.strptime(fdate, "%Y-%m-%d")
            fdate = fdate.date()
            queryset = queryset.filter(start_time__date=fdate)

        time_begin = self.request.query_params.get('time_begin')
        time_end = self.request.query_params.get('time_end')
        if time_begin is not None:
            time_begin = datetime.strptime(time_begin, "%H:%M:%S")
            time_begin = time_begin.time()
            queryset = queryset.filter(start_time__time__gte=time_begin)

        if time_end is not None:
            time_end = datetime.strptime(time_end, "%H:%M:%S")
            time_end = time_end.time()
            queryset = queryset.filter(start_time__time__lt=(time_end - F("belonged_class__duration")))

        return queryset
