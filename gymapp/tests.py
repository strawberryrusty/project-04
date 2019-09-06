from django.urls import reverse
from django.contrib.auth.models import User # import the User model
from rest_framework.test import APITestCase
from .models import Item, Programme, Exercise, Category


class GymappTest(APITestCase):

    def setUp(self):
        user = User.objects.create(username='test', email='test@test.com', password='test')
        Programme.objects.create(name='Summer', user=user)

        self.client.force_authenticate(user=user)

    def test_programmes_index(self):
        """""
        should return an array of Programmes
        """""

        url = reverse('programmes-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, [{
            'id': 1,
            'name': 'Summer',
            'items': []
        }])

    def test_programmes_create(self):
        """""
        should create a programme
        """""

        url = reverse('programmes-list')
        data = {
            'name': 'Winter'
        }
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Programme.objects.count(), 2)
        self.assertJSONEqual(response.content, {
            "id": 2,
            "name": "Winter",
            "items": []
        })
