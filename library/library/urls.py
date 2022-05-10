from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from mainapp.views import AuhorViewSet
from userapp.views import UserViewSet
from todoapp.views import ProjectModelViewSet, ToDoModelViewSet, UserProjectModelViewSet


router = DefaultRouter()
router.register('authors', AuhorViewSet)
router.register('users', UserViewSet)
router.register('project', ProjectModelViewSet)
router.register('todo', ToDoModelViewSet)
router.register('usersproject', UserProjectModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
