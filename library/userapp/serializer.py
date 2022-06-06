from rest_framework import serializers
from .models import User


class UserModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'firstname', 'lastname', 'email']


class UserModelSerializer2(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'firstname', 'lastname', 'email', 'is_superuser', 'is_staff']