from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project, ToDo, UsersProject


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'


class UserProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = UsersProject
        fields = '__all__'