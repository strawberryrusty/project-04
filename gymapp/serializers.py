from rest_framework import serializers
from jwt_auth.serializers import UserSerializer
from .models import Programme, Item, Exercise, Category

class ProgrammeSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)# changes user id to username, email

    class Meta:
        model = Programme
        fields = ('id', 'name', 'items', 'user',)


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ('id', 'day', 'exercise', 'personalbest', 'sets', 'reps',)


class ExerciseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Exercise
        fields = ('id', 'name', 'description', 'image', 'categories')

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('id', 'name', 'exercises',)



class PopulatedItemSerializer(ItemSerializer):

    exercise = ExerciseSerializer()


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
