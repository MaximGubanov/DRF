from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from userapp.views import UserList, UserDetail, UserCreateViews
from todoapp.views import ProjectLimitOffsetPaginatonViewSet, ProjectParamFilterViewSet, \
    ToDoLimitOffsetPaginatonListCreate, ToDoLimitOffsetPaginatonDetails, TodoParamFilterByProjectViewSet


router = DefaultRouter()
filter_router = DefaultRouter()

router.register('projects', ProjectLimitOffsetPaginatonViewSet)
router.register('user-create', UserCreateViews)
filter_router.register('project', ProjectParamFilterViewSet, basename='project')
filter_router.register('todo', TodoParamFilterByProjectViewSet, basename='todos')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('users/', UserList.as_view()),
    path('users/<int:pk>/', UserDetail.as_view()),
    path('filters/', include(filter_router.urls)),
    path('todo/', ToDoLimitOffsetPaginatonListCreate.as_view()),
    path('todo/<int:pk>/', ToDoLimitOffsetPaginatonDetails.as_view()),
    path('api-token-auth/', obtain_auth_token),
]