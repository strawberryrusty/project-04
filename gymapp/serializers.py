from rest_framework import serializers
from jwt_auth.serializers import UserSerializer
from .models import Programme, Item, Exercise



class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ('id', 'day', 'exercises',)

class ProgrammeSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)# changes user id to username, email

    class Meta:
        model = Programme
        fields = ('id', 'name', 'items', 'user',)


class ExerciseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Exercise
        fields = ('id', 'name', 'sets', 'reps',)


class PopulatedItemSerializer(ItemSerializer):

    exercises = ExerciseSerializer(many=True)


class PopulatedProgrammeSerializer(ProgrammeSerializer):

    items = PopulatedItemSerializer(many=True)

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
