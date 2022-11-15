from rest_framework.response import Response
from rest_framework.views import APIView
from studios.models import Class, Studio, StudioImage, Tag


class AddClass(APIView):

    def post(self, request, *args, **kwargs):
        name = request.POST.get('name')
        studio = request.POST.get('studio')
        description = request.POST.get('description')
        capacity = request.POST.get('capacity')
        start_time = request.POST.get('start_time')
        end_time = request.POST.get('end_time')

        if not studio or not name or not capacity or not start_time or not end_time:
            return Response({'error': 'Missing required fields'})

        Class.objects.create(studio=studio,
                             name=name,
                             description=description,
                             capacity=capacity,
                             start_time=start_time,
                             end_time=end_time)
        return Response({'success': 'Class created'})