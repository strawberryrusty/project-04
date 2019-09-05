from rest_framework.test import APITestCase
from django.urls import reverse
from .models import Genre, Author, Book
# Create your tests here.
class BooksTest(APITestCase):

    def setUp(self):
        author = Author.objects.create(firstname='J', middlename='R R', lastname='Tolkien')
        genre = Genre.objects.create(name='Fantasy')
        book = Book.objects.create(title='The Hobbit', author=author, image='https://cdn.instructables.com/FN4/ASZK/G1BB7QJU/FN4ASZKG1BB7QJU.LARGE.jpg')
        book.genres.set([genre])


    def test_books_index(self):
        """
        Should return an array of books
        """

        url = reverse('books-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, [{
        'id': 1,
        "title": 'The Hobbit',
        'image': 'https://cdn.instructables.com/FN4/ASZK/G1BB7QJU/FN4ASZKG1BB7QJU.LARGE.jpg',
        'author': {
        'id':1,
        'firstname': 'J',
        'middlename': 'R R',
        'lastname': 'Tolkien'
        },
        'genres':[{
        'id': 1,
        'name': 'Fantasy',
        }]
        }])



    def test_books_create(self):
        """
        Should create a book
        """

        url = reverse('books-list')
        data = {
            'title':'The Lord of the Rings',
            'image': 'https://cdn.instructables.com/FN4/ASZK/G1BB7QJU/FN4ASZKG1BB7QJU.LARGE.jpg',
            'author': 1,
            'genres': [1]
        }
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Book.objects.count(), 2)
        self.assertJSONEqual(response.content, {
        'id': 2,
            "title": 'The Lord of the Rings',
            'image': 'https://cdn.instructables.com/FN4/ASZK/G1BB7QJU/FN4ASZKG1BB7QJU.LARGE.jpg',
            'author': {
                'id':1,
                'firstname': 'J',
                'middlename': 'R R',
                'lastname': 'Tolkien'
            },
            'genres':[{
                'id': 1,
                'name': 'Fantasy',
            }]
        })
