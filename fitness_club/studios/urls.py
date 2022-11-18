from django.urls import path
from studios.views.all_studios import AllStudiosView
from studios.views.search_studio import SearchView
from studios.views.studio_detail import StudiosDetailView
from studios.views.class_view import EnrollClassView, DeleteClassView, EnrollEventView, DeleteEventView, ScheduleView, HistoryView
from studios.views.studio_filter import StudioFilterView

urlpatterns = [
    path('all/', AllStudiosView.as_view(), name='studio'),
    path('search-location/', SearchView.as_view(), name='search-location'),
    path('studio-detail/<int:pk>/', StudiosDetailView.as_view(), name='studio-detail'),
    path('enroll-class/<int:pk>/', EnrollClassView.as_view(), name="enroll-class"),
    path('delete-class/<int:pk>/', DeleteClassView.as_view(), name="delete-class"),
    path('enroll-event/<int:pk>/', EnrollEventView.as_view(), name="enroll-event"),
    path('delete-event/<int:pk>/', DeleteEventView.as_view(), name="delete-event"),
    path('schedule/', ScheduleView.as_view(), name="schedule"),
    path('history/', HistoryView.as_view(), name="history"),
]
