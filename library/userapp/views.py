from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializer import UserModelSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer