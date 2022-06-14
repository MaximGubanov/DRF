from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Project, Todo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'url', 'name', 'repo', 'created_at', 'updated_at', 'created_by']


class ToDoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'text', 'project', 'created_by', 'is_active']


class TodoSerializer(ModelSerializer):

    project = ProjectModelSerializer()

    class Meta:
        model = Todo
        fields = ['id', 'text', 'project', 'created_by', 'is_active']
