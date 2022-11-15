from django.urls import path
from .views.AllStudios import AllStudiosView

urlpatterns = [
    path('all/', AllStudiosView.as_view(), name='studio'),
]
