from django.urls import path
from studios.views.all_studios import AllStudiosView
from studios.views.search_studio import SearchView

urlpatterns = [
    path('all/', AllStudiosView.as_view(), name='studio'),
    path('search/', SearchView.as_view(), name='search'),
]
