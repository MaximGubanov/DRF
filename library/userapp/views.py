from rest_framework import status, permissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from django.http import Http404

from .models import User
from .serializer import UserModelSerializer


class UserCreateViews(ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class UserList(APIView):

    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    permission_classes = [permissions.IsAuthenticated]

    #  возможность просмотреть всех пользователей
    def get(self, request):
        queryset = User.objects.all()
        serializer = UserModelSerializer(queryset, many=True)
        return Response(serializer.data)

    #  возможность создавать пользователя (из усл. задания следует, что эту ф-ю нужно отключить)
    def post(self, request):
        serializer = UserModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):

    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        try:
            print(pk)
            return User.objects.get(pk=pk)
        except Exception:
            raise Http404

    #  получаем одного пользователя
    def get(self, request, pk):
        queryset = self.get_object(pk)
        serializer = UserModelSerializer(queryset)
        return Response(serializer.data)

    #  делаем изменения конкретного пользователя
    def put(self, request, pk):
        queryset = self.get_object(pk)

        serializer = UserModelSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #  удаление пользователя (из усл. задания следует, что эту ф-ю нужно отключить)
    # def delete(self, request, pk, format=None):
    #     queryset = self.get_object(pk)
    #     queryset.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)