from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Programme(models.Model):
    firstname = models.CharField(max_length=20)
    middlename = models.CharField(max_length=20, blank=True)
    lastname = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.firstname} {self.middlename} {self.lastname}'

class Item(models.Model):
    day = models.CharField(max_length=20)
    sets = models.IntegerField()
    reps = models.IntegerField()
    programme = models.ForeignKey(Programme, related_name='items', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='albums', on_delete=models.CASCADE)


    def __str__(self):
        return f'{self.day} - {self.programme}'
