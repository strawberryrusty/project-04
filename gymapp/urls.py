from django.urls import path
from .views import ProgrammeListView, ProgrammeDetailView, CategoryListView, CategoryDetailView, ProgrammeItemListView, ProgrammeItemDetailView, ExerciseListView, ExerciseDetailView, ItemListView, ItemDetailView


urlpatterns = [
    path('personalbest/', ProgrammeListView.as_view(), name='personalbest-list'),
    path('personalbest/<int:pk>/', ProgrammeDetailView.as_view(), name='personalbest-detail'),
    path('categories/', CategoryListView.as_view(), name='categories-list'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='categories-detail'),
    path('exercises/', ExerciseListView.as_view(), name='exercises-list'),
    path('exercises/<int:pk>/', ExerciseDetailView.as_view(), name='exercises-detail'),
    path('items/', ItemListView.as_view(), name='items-list'),
    path('items/<int:pk>/', ItemDetailView.as_view(), name='items-list'),
    path('programmes/', ProgrammeListView.as_view(), name='programmes-list'),
    path('programmes/<int:pk>/', ProgrammeDetailView.as_view(), name='programmes-detail'),
    path('programmes/<int:pk>/items/', ProgrammeItemListView.as_view(), name='programmes-items-list'),
    path('programmes/<int:programme_pk>/items/<int:pk>', ProgrammeItemDetailView.as_view(), name='programmes-items-detail')
]
