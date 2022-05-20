from django.db import models
from django.utils import timezone

from userapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=32)
    repo = models.CharField(max_length=128)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now())
    updated_at = models.DateTimeField(blank=True, null=True)


class Todo(models.Model):
    text = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.PROTECT, null=True, related_name='projects')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    assigned_to = models.ManyToManyField(User, related_name='performers')
    created_at = models.DateTimeField(default=timezone.now())
    update_at = models.DateTimeField(blank=True, null=True)
    closed_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)