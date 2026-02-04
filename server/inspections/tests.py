from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse


class InspectionTests(APITestCase):
    def test_inspection_creation_valid(self):
        """
        test inspection creation with valid data
        """
        url = reverse('inspection-list')

        data = {
            "vehicle_plate": "KDM200R",
            "inspection_date": "2026-03-22",
            "status": "scheduled",
            "notes": "First inspection"
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_inspection_creation_invalid_date(self):
        """
        Test creation of inspections with past dates are rejected
        """
        url = reverse('inspection-list')

        data = {
            "vehicle_plate": "KDM200R",
            "inspection_date": "2022-03-22",
            "status": "scheduled",
            "notes": "invalid inspection"
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
