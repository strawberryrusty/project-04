from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.name}'


class Exercise(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    image = models.CharField(max_length=500)
    categories = models.ManyToManyField(Category, related_name='exercises', blank=True)

    def __str__(self):
        return f'{self.name}'


class Programme(models.Model):
    name = models.CharField(max_length=20)
    image = models.CharField(max_length=500, default='https://www.chardandilminsternews.co.uk/resources/images/9833873.jpg?display=1&htype=0&type=responsive-gallery')
    location = models.CharField(max_length=50)
    user = models.ForeignKey(User, related_name='programmes', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name} - {self.user}'


class Item(models.Model):
    day = models.CharField(max_length=20)
    sets = models.IntegerField()
    reps = models.IntegerField()
    programme = models.ForeignKey(Programme, related_name='items', on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, related_name='items', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.day}'


class Personalbest(models.Model):
    date = models.DateField(auto_now_add=True)
    weight = models.IntegerField()
    item = models.ForeignKey(Item, related_name='personalbests', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.date} - {self.weight}'
