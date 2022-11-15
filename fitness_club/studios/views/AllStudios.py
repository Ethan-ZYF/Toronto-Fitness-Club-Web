from rest_framework.response import Response
from rest_framework.views import APIView
from studios.models import Class, Studio, StudioImage, Tag


class AllStudiosView(APIView):

    def get(self, request, *args, **kwargs):
        # studios = Studio.objects.all()
        studio_list = []
        studios = Studio.objects.all()
        for studio in studios:
            studio_list.append({
                'name': studio.name,
                'address': studio.address,
                'location': studio.location,
            })

        return Response({'studios': studio_list})