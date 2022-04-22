from django.db import models
from uuid import uuid4


class User(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    username = models.CharField(verbose_name='username', max_length=64)
    firstname = models.CharField(verbose_name='firstname', max_length=64)
    lastname = models.CharField(verbose_name='lastname', max_length=64)
    email = models.EmailField(verbose_name='email', unique=True)