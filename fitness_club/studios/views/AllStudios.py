from rest_framework.response import Response
from rest_framework.views import APIView
from studios.models import Class, Studio, StudioImage, Tag


class AllStudiosView(APIView):

    def get(self, request, *args, **kwargs):
        # studios = Studio.objects.all()
        studio_list = []
        studios = Studio.objects.all()
        for studio in studios:
            images = studio.studioimage_set.all().values_list('image', flat=True)
            amenities = studio.amenity_set.all().values()
            studio_list.append({
                'name': studio.name,
                'address': studio.address,
                'location': studio.location,
                'amenities': amenities,
                'images': images,
            })

        return Response({'studios': studio_list})