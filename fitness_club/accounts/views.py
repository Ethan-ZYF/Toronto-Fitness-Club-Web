from django.shortcuts import render
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer

# Create your views here.
class SignupView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)
    
    def get(self, request, *args, **kwargs):
        return Response("Welcome to the signup page")
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response("User created successfully")