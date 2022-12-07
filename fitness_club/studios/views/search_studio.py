from rest_framework.generics import ListCreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from studios.models import Studio
from studios.serializers.search import SearchSerializer
from studios.serializers.all_studios import ListSerializer, FilterLocationSerializer
import copy

class SearchView(ListAPIView):
    serializer_class = FilterLocationSerializer
    permission_classes = (IsAuthenticated,)
    model = Studio
    
    def __init__(self, *args, **kwargs):
        super(SearchView, self).__init__(*args, **kwargs)
        self.target_lat = 0.0
        self.target_lon = 0.0

    # post request to search for studios based on location
    def post(self, request, *args, **kwargs):
        # print(f'post:{self.target_lat}, {self.target_lon}')
        self.target_lat = request.POST.get('latitude')
        self.target_lon = request.POST.get('longitude')
        return Response({'Success': 'Location received'})

    # def get(self, request, *args, **kwargs):
    #     return Response({'success': 'Class created'})
    
    def get_queryset(self):
        lat = float(self.target_lat)
        lon = float(self.target_lon)
        all_studios = Studio.objects.all()
        print(len(all_studios))
        studio_list = sorted(all_studios, key=lambda x: (float(x.location.split(',')[0]) - lat) ** 2 + (float(x.location.split(',')[1]) - lon) ** 2)
        
        return studio_list

    # def list(self, request, *args, **kwargs):
    #     query_set = self.get_queryset()
    #     serializer = ListSerializer(context={'request': request}, instance=query_set, many=True)
    #     return Response(serializer.data)
    