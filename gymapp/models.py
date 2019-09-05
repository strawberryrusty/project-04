from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Exercise(models.Model):
    name = models.CharField(max_length=50)
    sets = models.IntegerField()
    reps = models.IntegerField()

    def __str__(self):
        return f'{self.name} {self.sets} {self.reps} '


class Programme(models.Model):
    name = models.CharField(max_length=20)
    user = models.ForeignKey(User, related_name='programmes', on_delete=models.CASCADE)


    def __str__(self):
        return f'{self.name} - {self.user}'


class Item(models.Model):
    day = models.CharField(max_length=20)
    exercises = models.ManyToManyField(Exercise, related_name='items', blank=True)
    programme = models.ForeignKey(Programme, related_name='items', on_delete=models.CASCADE)


    def __str__(self):
        return f'{self.day}'
