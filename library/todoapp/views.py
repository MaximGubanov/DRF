from django.utils import timezone
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import status
from rest_framework import generics

from .serializers import ProjectModelSerializer, ToDoModelSerializer, TodoSerializer
from .models import Project, Todo


class ProjectLimitOffsetPagination(LimitOffsetPagination):

    default_limit = 10
    max_limit = 10


class ProjectLimitOffsetPaginatonViewSet(ModelViewSet):

    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination


class ProjectParamFilterViewSet(ModelViewSet):

    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()

    def get_queryset(self):
        param = self.request.query_params.get('title')
        if param is not None:
            return Project.objects.filter(title__contains=param)
        return super().get_queryset()


class TodoLimitOffsetPagination(LimitOffsetPagination):

    default_limit = 20


class ToDoLimitOffsetPaginatonListCreate(generics.ListCreateAPIView):

    queryset = Todo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = TodoLimitOffsetPagination


class ToDoLimitOffsetPaginatonDetails(generics.RetrieveUpdateDestroyAPIView):

    queryset = Todo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = TodoLimitOffsetPagination

    def delete(self, request, *args, **kwargs):
        print(kwargs['pk'])
        note = self.queryset.get(pk=kwargs['pk'])
        note.is_active = False
        note.closed_at = timezone.now()
        note.save()
        return Response(status=status.HTTP_200_OK)


class TodoParamFilterByProjectViewSet(ModelViewSet):

    serializer_class = ToDoModelSerializer
    queryset = Todo.objects.all()

    def get_queryset(self):
        param = self.request.query_params.get('name')
        if param is not None:
            return Project.objects.filter(name__contains=param)
        return super().get_queryset()