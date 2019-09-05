from django.urls import path
from .views import ProgrammeListView, ProgrammeDetailView, ItemListView, ItemDetailView


urlpatterns = [
    path('programmes/', ProgrammeListView.as_view()),
    path('programmes/<int:pk>/', ProgrammeDetailView.as_view()),
    path('items/', ItemListView.as_view()),
    path('items/<int:pk>/', ItemDetailView.as_view()),
]
