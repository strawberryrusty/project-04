from rest_framework import serializers
from jwt_auth.serializers import UserSerializer
from .models import Programme, Item

class NestedProgrammeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Programme
        fields = ('id', 'firstname', 'middlename', 'lastname',)


class NestedItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ('id', 'day', 'sets', 'reps',)


class ProgrammeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Programme
        fields = ('id', 'firstname', 'middlename', 'lastname',)


class ItemSerializer(serializers.ModelSerializer):

    programme = NestedProgrammeSerializer()
    user = UserSerializer(read_only=True)# changes user id to username, email

    class Meta:
        model = Item
        fields = ('id', 'day', 'sets', 'reps', 'programme', 'user',)
