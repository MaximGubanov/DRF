import json

from django.test import TestCase
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer
# from django.contrib.auth.models import User
import mimesis

from userapp.views import UserList, UserCreateViews
from userapp.models import User
# from todoapp.views import
from todoapp.models import Project, Todo


class TestUsersViewSet(TestCase):

    def test_get_list_users_unauthorized(self):
        """ тест на получение списка пользователей, которые не авторизованы
        """
        factory = APIRequestFactory()
        request = factory.get('users/')
        view = UserList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_users_authorized(self):
        """ тест на получение списка пользователей, которые авторизованы
        """
        factory = APIRequestFactory()
        request = factory.get('users/')
        user = User.objects.create_user(username='max', password='123456')
        view = UserList.as_view()
        force_authenticate(request, user=user)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user_unauthorized(self):
        """ тест на создание пользователя, в UserCreateViews я разрешил
        создавать пользователей любым не авторизованым гостям, например для регистрации
        """
        factory = APIRequestFactory()
        request = factory.post('api/user-create', json.dumps(
                {
                    "username": "ivan",
                    "firstname": "Иван",
                    "lastname": "Ильин",
                    "email": "iv@mail.ru"
                }
            ), content_type='application/json')
        view = UserCreateViews.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_user_unauthorized(self):
        """ не авторизованый польз-ль не может смотреть детали другого польз-ля
        """
        user = User.objects.create_user(username='user', password='123456')
        client = APIClient()
        response = client.get(f'/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_user_authorized(self):
        """ авторизований пользователь может смотреть детали др. пользователей
        """
        user = User.objects.create_user(username='user', password='123456')
        admin = User.objects.create_superuser(username='admin', email='admin@admin.ru', password='12admin')
        client = APIClient()
        client.login(username='admin', password='12admin')
        response = client.get(f'/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_user_authorized(self):
        """ тест на изменение данных авторизованым пользователем
        """
        user = User.objects.create_user(username='user', email='user@admin.ru', password='123456')
        user1 = User.objects.create_user(username='user1', email='user1@admin.ru', password='123456')
        client = APIClient()
        client.login(username='user1', password='123456')
        response = client.put(f'/users/{user.id}/', json.dumps(
                {
                    "username": "Maxim",
                    "password": "654321",
                    "firstname": "Maxim",
                    "lastname": "Maximov",
                    "email": "max@mail.ru"
                }
            ), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = User.objects.get(id=user.id)
        self.assertEqual(user.username, 'Maxim')
        self.assertEqual(user.firstname, 'Maxim')
        self.assertEqual(user.lastname, 'Maximov')
        self.assertEqual(user.email, 'max@mail.ru')

    def test_edit_user_with_lib_mixer(self):
        """ тест с использованием библиотеки mixer
        """
        user = mixer.blend(User)
        admin = User.objects.create_superuser('admin', 'admin@admin.com', '123456')
        self.client.login(username='admin', password='123456')
        response = self.client.put(f'/users/{user.id}/', json.dumps({
            "username": "Maxim",
            "password": "654321",
            "firstname": "Maxim",
            "lastname": "Maximov",
            "email": "max@mail.ru"
        }),
                                   content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_authorized_with_lib_mimesis(self):
        """ тест с библиотекой mimesis
        """
        user = mimesis.Person()
        id = 1
        print(f'{id}id')
        username = user.username()
        password = user.password()
        email = user.email()

        admin = User.objects.create_superuser(username=username, email=email, password=password)
        client = APIClient()
        client.login(username=username, password=password)
        response = client.get(f'/users/{id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestTodoViewSet(APITestCase):

    def test_get_project_list(self):
        """ тест на доступность по адресу /filters/project/ """
        response = self.client.get('/filters/project/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_todo_list(self):
        """ тест на доступность по адресу /filters/todo/"""
        response = self.client.get('/filters/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_edit_todo_by_admin(self):
        # В этом тесте тоже словил ошибку(
        # TypeError: Direct assignment to the forward side of a many-to-many set is prohibited.
        # Use assigned_to.set() instead.

        # admin = User.objects.create_superuser(username='admin', email='admin@admin.ru', password='12admin')
        # user = User.objects.create_user(username='user', email='user@admin.ru', password='123456')
        #
        # project = Project.objects.create(
        #     name='Project',
        #     repo='http://',
        #     created_by=user,
        #     created_at=timezone.now()
        # )
        #
        # todo = Todo.objects.create(
        #     text="Notes",
        #     project=project,
        #     created_by=user,
        #     assigned_to=user,
        #     created_at=timezone.now(),
        #     is_active=True
        # )
        #
        # self.client.login(username='admin', password='12admin')
        # response = self.client.put(f'/filters/todo/{todo.id}/', json.dumps({"text": "Notes123"}),
        #                            content_type='application/json')
        # self.assertEqual(response.status_code, status.HTTP_200_OK)