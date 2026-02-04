from django.utils import timezone
from rest_framework import serializers

from .models import STATUS_CHOICES, Inspection


class InspectionSerializer(serializers.ModelSerializer):
    status = serializers.CharField()

    class Meta:
        model = Inspection
        fields = [
            "id",
            "vehicle_plate",
            "inspection_date",
            "status",
            "notes",
        ]


    def validate_status(self, value):
        if value not in STATUS_CHOICES:
            raise serializers.ValidationError(
                "Status host to be one of; scheduled, passed, or failed"
            )

        return value

    def validate_inspection_date(self, value):
        today = timezone.localdate()

        if value < today:
            raise serializers.ValidationError(
                "Inspection date cannot be in the past"
            )

        return value
