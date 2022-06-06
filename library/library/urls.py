from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from userapp.views import UserList, UserDetail, UsersListViews
from todoapp.views import ProjectLimitOffsetPaginatonViewSet, ProjectParamFilterViewSet, \
    ToDoLimitOffsetPaginatonListCreate, ToDoLimitOffsetPaginatonDetails, TodoParamFilterByProjectViewSet


schema_view = get_schema_view(
    openapi.Info(
        title="MyProjectAPI",
        default_version='0.1',
        description="Documentation API",
        contact=openapi.Contact(email="m_gubanov@bk.ru"),
        license=openapi.License(name="Free"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

router = DefaultRouter()
filter_router = DefaultRouter()

router.register('projects', ProjectLimitOffsetPaginatonViewSet)
router.register('users', UsersListViews)
filter_router.register('project', ProjectParamFilterViewSet, basename='project')
filter_router.register('todo', TodoParamFilterByProjectViewSet, basename='todos')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('users/', UserList.as_view()),  # представление через APIView
    path('users/<int:pk>/', UserDetail.as_view()),
    path('filters/', include(filter_router.urls)),
    path('todo/', ToDoLimitOffsetPaginatonListCreate.as_view()),
    path('todo/<int:pk>/', ToDoLimitOffsetPaginatonDetails.as_view()),
    path('api-token-auth/', obtain_auth_token),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
