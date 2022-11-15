from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from studios.models import Class, Studio, StudioImage, Tag
from studios.serializers.all_studios import ListSerializer
from rest_framework.renderers import AdminRenderer


class AllStudiosView(ListAPIView):
    renderer_classes = [AdminRenderer]
    model = Studio
    serializer_class = ListSerializer

    def get_queryset(self):
        return Studio.objects.all()