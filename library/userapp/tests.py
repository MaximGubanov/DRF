import json
# from django.test import TestCase
# from rest_framework import status
# from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
# from mixer.backend.django import mixer
# from django.contrib.auth.models import User
# from .views import UserList
# from .models import Author, Book
#
#
# class TestAuthorViewSet(TestCase):
#     def test_get_list_users(self):
#         factory = APIRequestFactory()
#         request = factory.get('/users/')
#         view = UserList.as_view()({'get': 'list'})
#         response = view(request)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)