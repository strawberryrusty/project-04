from django.urls import path
from .views import ProgrammeListView, ProgrammeDetailView, ItemListView, ItemDetailView


urlpatterns = [
    path('exercises/', ProgrammeListView.as_view(), name='exercises-list'),
    path('exercises/<int:pk>/', ProgrammeDetailView.as_view(), name='exercises-list'),
    path('items/', ItemListView.as_view(), name='items-list'),
    path('items/<int:pk>/', ItemDetailView.as_view(), name='items-list'),
    path('programmes/', ProgrammeListView.as_view(), name='programmes-list'),
    path('programmes/<int:pk>/', ProgrammeDetailView.as_view(), name='programmes-list'),
]
