from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project, Todo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = ['text', 'created_by', 'assigned_to', 'created_at', 'closed_at', 'is_active', 'project']