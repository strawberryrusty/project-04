from django.urls import reverse
from django.contrib.auth.models import User # import the User model
from rest_framework.test import APITestCase
from .models import Artist, Album


class GymappTest(APITestCase):

    def setUp(self):
        user = User.objects.create(username='test', email='test@test.com', password='test',)
        item = Item.objects.create(day='Monday', exercises=exercises, programme=programme)
        programme = Programme.objects.create(name='Summer', user=user)
        category = Category.objects.create(name='arm')

        self.client.force_authenticate(user=user)



    def test_albums_index(self):
        """
        Should return an array of albums
        """

        url = reverse('albums-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, [{
            'id': 1,
            'title':'American Gangster',
            'year': 2008,
            'length': 3456,
            'record_label': 'Roc-A-Fella',
            'image': 'https://cdn.instructables.com/FN4/ASZK/G1BB7QJU/FN4ASZKG1BB7QJU.LARGE.jpg',
            'artist': {
                'id':1,
                'firstname': 'Jay',
                'middlename': '',
                'lastname': 'Z'
            },
            'user': {
                'username': 'test',
                'email': 'test@test.com'
            }
        }])



    def test_albums_create(self):
        """
        Should create a album
        """

        url = reverse('albums-list')
        data = {
            'title':'The Lord of the Rings',
            'image': 'https://cdn.instructables.com/FN4/ASZK/G1BB7QJU/FN4ASZKG1BB7QJU.LARGE.jpg',
            'artist': 1,
            'year': 2008,
            'length': 3456,
            'record_label': 'Columbia',
        }
        response = self.client.post(url, data)
        print(response.content)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Album.objects.count(), 2)
        self.assertJSONEqual(response.content, {
            'id': 2,
            'title': 'The Lord of the Rings',
            'image': 'https://cdn.instructables.com/FN4/ASZK/G1BB7QJU/FN4ASZKG1BB7QJU.LARGE.jpg',
            'year':2008,
            'length': 3456,
            'record_label': 'Columbia',
            'artist': {
                'id':1,
                'firstname': 'Jay',
                'middlename': '',
                'lastname': 'Z'
            },
            'user': {
                'username': 'test',
                'email': 'test@test.com'
            }
        })
        self.client.force_authenticate(user=None) # remove authentication
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 401)
