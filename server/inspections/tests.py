from datetime import timedelta

from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Inspection


class InspectionTests(APITestCase):
    def setUp(self):
        self.url = reverse('inspection-list')
        self.valid_data = {
            "vehicle_plate": "KDM200R",
            "inspection_date": (timezone.localdate() + timedelta(days=30)).isoformat(),
            "status": "scheduled",
            "notes": "First inspection"
        }

    def test_inspection_creation_valid(self):
        """
        test inspection creation with valid data
        """
        response = self.client.post(self.url, self.valid_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Inspection.objects.count(), 1)

    def test_inspection_creation_invalid_date(self):
        """
        Test creation of inspections with past dates are rejected
        """
        past_date = (timezone.localdate() - timedelta(days=1)).isoformat()
        data = {**self.valid_data, "inspection_date": past_date}

        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Inspection.objects.count(), 0)

