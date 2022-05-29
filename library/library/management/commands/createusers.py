from django.core.management.base import BaseCommand, CommandError
from userapp.models import User


# class Command(BaseCommand):
#     def handle(self, *args, **options):
#         user = User.objects.create_superuser('Serj', 'Serjey', 'Malkov', 'mal@bk.ru')
#         if user:
#             print('Created user')