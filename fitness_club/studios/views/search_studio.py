from rest_framework.generics import ListCreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from studios.models import Studio
from studios.serializers.search import SearchSerializer
from studios.serializers.all_studios import ListSerializer, FilterLocationSerializer
import copy

class SearchView(ListCreateAPIView):
    serializer_class = FilterLocationSerializer
    permission_classes = (IsAuthenticated,)
    model = Studio

    def __init__(self):
        super().__init__()
        with open('studios/views/target_loc.txt', 'r') as f:
            self.target_lat, self.target_lon = f.read().split(',')
        print(f'init:{self.target_lat}, {self.target_lon}')

    # post request to search for studios based on location
    def post(self, request, *args, **kwargs):
        with open('studios/views/target_loc.txt', 'w') as f:
            f.write(request.data['location'])
            print(f'write:{request.data["location"]}')
        return Response({'Success': 'Location received'})

    # def get(self, request, *args, **kwargs):
    #     return Response({'success': 'Class created'})
    
    def get_queryset(self):
        all_studios = Studio.objects.all()
        lat = float(self.target_lat)
        lon = float(self.target_lon)
        studio_list = sorted(all_studios, key=lambda x: (float(x.location.split(',')[0]) - lat) ** 2 + (float(x.location.split(',')[1]) - lon) ** 2)
        
        return studio_list

    # def list(self, request, *args, **kwargs):
    #     query_set = self.get_queryset()
    #     serializer = ListSerializer(context={'request': request}, instance=query_set, many=True)
    #     return Response(serializer.data)
    