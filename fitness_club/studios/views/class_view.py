from rest_framework import generics
from studios.models import Studio, Event
from studios.serializers.studio_detail import StudioSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework import generics
from rest_framework.views import APIView
from django.utils import timezone
from studios.serializers.studio_detail import ScheduleSerializer
from django.http import HttpResponseRedirect


class EnrollClassView(APIView):
    # authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response(
            "Send post request to enroll in all future sessions for this class!"
        )

    def post(self, request, *args, **kwargs):
        if not request.user.active_subscription:
            print(request.user.active_subscription)
            return Response(
                "You must have an active subscription to enroll in classes!")
        events = Event.objects.filter(belonged_class=kwargs['pk']).filter(
            start_time__gt=timezone.now())
        if len(events) == 0:
            return Response(
                'Error! This class either does not exist or has no more future session!'
            )
        user = request.user
        for e in events:
            user.schedule.add(e)
            e.curr_capacity += 1
            e.save()
        return Response(
            'You have successfully enrolled in all future sessions for this class!'
        )
        # return HttpResponseRedirect(redirect_to='https://studios/schedule.com')


class DeleteClassView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response(
            "Send post request to delete all future sessions for this class from your schedule!"
        )

    def post(self, request, *args, **kwargs):
        user = request.user
        if len(user.schedule.filter(belonged_class=kwargs['pk'])) == 0:
            return Response('Error! You are not enrolled in this class!')
        for e in user.schedule.all():
            if e.belonged_class.id == kwargs['pk']:
                user.schedule.remove(e)
                e.curr_capacity -= 1
                e.save()
        return Response(
            'You have successfully deleted all future sessions for this class from your schedule!'
        )
        # return HttpResponseRedirect(redirect_to='https://studios/schedule.com')


class EnrollEventView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response("Send post request to enroll in this session!")

    def post(self, request, *args, **kwargs):
        if not request.user.active_subscription:
            print(request.user.active_subscription)
            return Response(
                "You must have an active subscription to enroll in classes!")
        try:
            event = Event.objects.get(id=kwargs['pk'])
        except Event.DoesNotExist:
            return Response("Error! This event does not exist")

        if event.start_time < timezone.now():
            return Response(
                "Error! Can not enroll in this session because it has already happened!"
            )

        user = request.user
        event.curr_capacity += 1
        user.schedule.add(event)
        event.save()
        return Response("You have successfully enrolled in this session!")
        # return HttpResponseRedirect(redirect_to='https://studios/schedule.com')


class DeleteEventView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response("Send post request to unenroll in this session!")

    def post(self, request, *args, **kwargs):
        try:
            event = Event.objects.get(id=kwargs['pk'])
        except Event.DoesNotExist:
            return Response("Error! This event does not exist")

        if event.start_time < timezone.now():
            return Response(
                "Error! Can not unenroll in this session because it has already happened!"
            )

        try:
            to_remove_event = user.schedule.get(id=kwargs['pk'])
        except Event.DoesNotExist:
            return Response("Error! You are not enrolled in this session!")

        user = request.user
        user.schedule.remove(event)
        event.curr_capacity -= 1
        event.save()
        return Response("You have successfully unenrolled this session!")
        # return HttpResponseRedirect(redirect_to='https://studios/schedule.com')


def updateScheduleHistory(user):
    expired_events = user.schedule.filter(start_time__lt=timezone.now())
    for e in expired_events:
        user.history.add(e)
        user.schedule.remove(e)


class ScheduleView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        updateScheduleHistory(request.user)
        return Response(ScheduleSerializer(request.user).data)


class HistoryView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        updateScheduleHistory(request.user)
        return Response(ScheduleSerializer(request.user).data)