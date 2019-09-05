from rest_framework import serializers
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

    class Meta:
        model = Item
        fields = ('id', 'day', 'sets', 'reps', 'programme',)
