from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from studios.models import Studio
from studios.serializers.search import SearchSerializer


class SearchView(ListCreateAPIView):
    serializer_class = SearchSerializer
    permission_classes = (IsAuthenticated,)

    # post request to search for studios based on location
    def post(self, request, *args, **kwargs):
        target_lat = request.POST.get('latitude')
        target_lon = request.POST.get('longitude')
        print(target_lat, target_lon)
        target_lat = float(target_lat)
        target_lon = float(target_lon)
        # target_lon, target_lat = 39.740986355883564,116.27929687499999
        all_studios = Studio.objects.all()
        dist_idx_pair = []
        for i, studio in enumerate(all_studios):
            lat, lon = studio.location.split(',')
            lon = float(lon)
            lat = float(lat)
            dist = (lon - target_lon) ** 2 + (lat - target_lat) ** 2
            dist_idx_pair.append((dist, i))
        dist_idx_pair.sort()
        studio_list = []
        for dist, idx in dist_idx_pair:
            studio = all_studios[idx]
            images = studio.images.all()
            amenities = studio.amenities.all()
            amenity_set = ()
            for amenity in amenities:
                amenity_set += ({'type': amenity.type, 'quantity': amenity.quantity},)
            studio_list.append({
                'name': studio.name,
                'address': studio.address,
                'location': studio.location,
                'amenities': amenity_set,
                'images': [image.image.url for image in images],
            })
        return Response({'studios': studio_list})

    def get(self, request, *args, **kwargs):
        return Response({'success': 'Class created'})
