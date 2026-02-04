from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InspectionViewSet

router = DefaultRouter()


router.register('inspections', InspectionViewSet, basename='inspections')


urlpatterns = [
    path('', include(router.urls))
]
