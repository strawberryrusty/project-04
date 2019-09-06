from django.contrib import admin
from .models import Programme, Exercise, Item, Category

# Register your models here.
admin.site.register(Programme)
admin.site.register(Exercise)
admin.site.register(Item)
admin.site.register(Category)
