from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from studios.models import Class, Studio, StudioImage, Tag
from studios.serializers.all_studios import ListSerializer


class AllStudiosView(ListAPIView):
    model = Studio
    serializer_class = ListSerializer

    def get_queryset(self):
        return Studio.objects.all()