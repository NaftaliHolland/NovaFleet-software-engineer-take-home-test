from django.db import models


STATUS_CHOICES = [
    ("scheduled", "Scheduled"),
    ("passed", "Passed"),
    ("failed", "Failed"),
]

class Inspection(models.Model):

    vehicle_plate = models.CharField(max_length=20)
    inspection_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.vehicle_plate} - {self.inspection_date}: {self.status}"

