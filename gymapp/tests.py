from django.urls import reverse
from django.contrib.auth.models import User # import the User model
from rest_framework.test import APITestCase
from .models import Item, Programme, Exercise, Category


class GymappTest(APITestCase):

    def setUp(self):
        user = User.objects.create(username='test', email='test@test.com', password='test')
        category = Category.objects.create(name='Arm')
        exercise = Exercise.objects.create(name='Bench Press', descriptions='Do the Bench Press', image='https://thumbs.gfycat.com/TastyAcceptableArgentinehornedfrog-size_restricted.gif', category=category)
        item = Item.objects.create(day='Monday', exercise=exercise, sets='5', resp='6', personalbest='60', programme='Summer')
        programme = Programme.objects.create(name='Summer', user='user')
        exercise.category.set([category])

        # self.client.force_authenticate(user=user)

    def test_programmes_index(self):
        """""
        should return an array of Programmes
        """""

        url = reverse('programmes-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, [{
            'id': 1,
            'title': 'The Hobbit',
            'image': 'http://i.imgur.com/1KLiyRc',
            'author': {
                'id': 1,
                'firstname': 'J',
                'middlename': 'R R',
                'lastname': 'Tolkien'
            },
            'genres': [{
                'id': 1,
                'name': 'Fantasy'
            }]
        }])
