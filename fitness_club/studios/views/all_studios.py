from rest_framework.generics import ListAPIView
from studios.models import Studio
from studios.serializers.all_studios import ListSerializer


class AllStudiosView(ListAPIView):
    model = Studio
    serializer_class = ListSerializer

    def get_queryset(self):
        return Studio.objects.all()
