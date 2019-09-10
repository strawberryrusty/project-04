from rest_framework import serializers
from django.contrib.auth.models import User
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True) # write_only: can only write to the server
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):# data here includes username, email, password, password password_confirmation

        password = data.pop('password') # removes password field
        password_confirmation = data.pop('password_confirmation') # removes password confirmation

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})

        try:
            validations.validate_password(password=password) # to check if the password is a strong password
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password) # here password is okay, hashed and passed into the data list
        return data

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'password_confirmation',)
