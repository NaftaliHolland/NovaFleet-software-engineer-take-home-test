import random
from datetime import timedelta
from django.utils import timezone

from django.core.management.base import BaseCommand
from inspections.models import Inspection

STATUS_CHOICES = ["scheduled", "passed", "failed"]

VEHICLE_PLATES = [
    "KAA123A", "KBB456B", "KCC789C", "KDD101D", "KEE202E"
]

class Command(BaseCommand):
    help = "Seed some inspection dummy data"

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding inspections...")

        for _ in range(5):
            vehicle_plate = random.choice(VEHICLE_PLATES)
            inspection_date = timezone.localdate() + timedelta(days=random.randint(-30, 30))
            status = random.choice(STATUS_CHOICES)
            notes = f"Sample note for {vehicle_plate}"

            inspection = Inspection.objects.create(
                vehicle_plate=vehicle_plate,
                inspection_date=inspection_date,
                status=status,
                notes=notes,
            )
            self.stdout.write(f"Created: {inspection}")

        self.stdout.write(self.style.SUCCESS("Finished seeding inspections."))
