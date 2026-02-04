from rest_framework.viewsets import ModelViewSet
from .models import Inspection
from .serializers import InspectionSerializer


class InspectionViewSet(ModelViewSet):
    queryset = Inspection.objects.all().order_by("-inspection_date")
    serializer_class = InspectionSerializer

