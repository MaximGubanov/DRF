from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDo, UsersProject
from .serializers import ProjectModelSerializer, ToDoModelSerializer, UserProjectModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer


class UserProjectModelViewSet(ModelViewSet):
    queryset = UsersProject.objects.all()
    serializer_class = UserProjectModelSerializer