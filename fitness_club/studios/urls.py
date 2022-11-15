from django.urls import path
from studios.views.all_studios import AllStudiosView
from studios.views.search_studio import SearchView
from studios.views.studio_detail import StudiosDetailView

urlpatterns = [
    path('all/', AllStudiosView.as_view(), name='studio'),
    path('search/', SearchView.as_view(), name='search'),
     path('studio-detail/<int:pk>/', StudiosDetailView.as_view(), name='studio-detail')
]
