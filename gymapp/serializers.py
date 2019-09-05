from rest_framework import serializers
from jwt_auth.serializers import UserSerializer
from .models import Programme, Item, Exercise, Category, PersonalBest



class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ('id', 'day', 'exercises', 'personalbest',)

class ProgrammeSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)# changes user id to username, email

    class Meta:
        model = Programme
        fields = ('id', 'name', 'items', 'user',)


class ExerciseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Exercise
        fields = ('id', 'name', 'sets', 'reps', 'categories')

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('id', 'name', 'exercises',)


class PersonalBestSerializer(serializers.ModelSerializer):

    class Meta:
        model = PersonalBest
        fields = ('id', 'date', 'weigth',)



class PopulatedItemSerializer(ItemSerializer):

    exercises = ExerciseSerializer(many=True)
    personalbest = PersonalBestSerializer(many=True)



class PopulatedProgrammeSerializer(ProgrammeSerializer):

    items = PopulatedItemSerializer(many=True)

class PopulatedCategorySerializer(CategorySerializer):

    exercises = ExerciseSerializer(many=True)






# class ItemSerializer(serializers.ModelSerializer):
#     exercises = ExerciseSerializer(many=True)
#     programmes = NestedProgrammeSerializer(many=True)
#
#     class Meta:
#         model = Item
#         fields = ('id', 'day', 'exercises', 'programmes',)
#
#
#
# class ProgrammeSerializer(serializers.ModelSerializer):
#     item = NestedItemSerializer()
#     user = UserSerializer(read_only=True)# changes user id to username, email
#
#     class Meta:
#         model = Programme
#         fields = ('id', 'name', 'item', 'user',)
