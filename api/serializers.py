from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
import re

#Serializer to Get User Details using Django Token Authentication
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ["id", "first_name", "last_name", "username"]


 
#Serializer to Register User
class RegisterSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(
    required=True,
    validators=[UniqueValidator(queryset=User.objects.all())]
  )
  password = serializers.CharField(
    write_only=True, required=True, validators=[validate_password])
  password2 = serializers.CharField(write_only=True, required=True)
  last_login = serializers.DateTimeField(read_only=True, auto_now_add=True)
  class Meta:
    model = User
    fields = ('id', 'username', 'password', 'password2',
         'email', 'first_name', 'last_name', 'last_login')
    extra_kwargs = {
      'first_name': {'required': True},
      'last_name': {'required': True},
    }

   

  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError(
        {"password": "Password fields didn't match."})
    return attrs

  def create(self, validated_data):
    user = User.objects.create(
      username=validated_data['username'],
      email=validated_data['email'],
      first_name=validated_data['first_name'],
      last_name=validated_data['last_name']
    )
    user.set_password(validated_data['password'])
    user.save()
    return user
  
  #Serializer to Update User Profile
class UserProfileSerializer(serializers.ModelSerializer):
    
    books_posted = serializers.SerializerMethodField()
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    last_login = serializers.DateTimeField(source='user.last_login', read_only=True)

    class Meta:
        model = UserProfile
        fields = ['user','username','first_name', 'last_name', 'email', 'phone_number', 'address', 'favorite_genres', 'notification_preferences', 'profile_picture', 'bio', 'books_posted', 'last_login']


    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.address = validated_data.get('address', instance.address)
        instance.favorite_genres = validated_data.get('favorite_genres', instance.favorite_genres)
        instance.notification_preferences = validated_data.get('notification_preferences', instance.notification_preferences)
        instance.profile_picture = validated_data.get('profile_picture', instance.profile_picture)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.save()
        return instance
    
    def get_books_posted(self, instance):
        # Logic to get the number of books posted by the user
        #return instance.books.all().count()
       pass