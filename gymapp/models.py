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
    user = models.ForeignKey(User, related_name='programmes', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name} - {self.user}'


class Item(models.Model):
    day = models.CharField(max_length=20)
    sets = models.IntegerField()
    reps = models.IntegerField()
    personalbest = models.IntegerField()
    programme = models.ForeignKey(Programme, related_name='items', on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, related_name='items', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.day}'
