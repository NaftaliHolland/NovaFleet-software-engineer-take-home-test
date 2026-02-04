from rest_framework import serializers
from .models import Inspection
from django.utils import timezone

class InspectionSerializer(serializers.ModelSerializer):
    status = serializers.ChoiceField(
        choices=["scheduled", "passed", "failed"],
        error_messages={
            "invalid_status": "Status must be one of: scheduled, passed, or failed."

        }
    )

    class Meta:
        model = Inspection
        fields = [
            "id",
            "vehicle_plate",
            "inspection_date",
            "status",
            "notes",
        ]

    def validate_inspection_date(self, value):
        today = timezone.localdate()

        if value < today:
            raise serializers.ValidationError(
                "Inspection date cannot be in the past"
            )

        return value
