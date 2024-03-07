from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
import re
from .models import Follow, Book, Review, Comment, Like, CartItem, Order
import datetime
#Serializer to Get User Details using Django Token Authentication
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ["id", "first_name", "last_name", "username", "email", "last_login"]


 
#Serializer to Register User
class RegisterSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(
    required=True,
    validators=[UniqueValidator(queryset=User.objects.all())]
  )
  password = serializers.CharField(
    write_only=True, required=True, validators=[validate_password])
  password2 = serializers.CharField(write_only=True, required=True)
  last_login = serializers.DateTimeField(read_only=True, required=False)
  class Meta:
    model = User
    fields = ('id', 'username', 'password', 'password2',
         'email', 'first_name', 'last_name', 'last_login')
    extra_kwargs = {
      'first_name': {'required': True},
      'last_name': {'required': True},
      'email': {'required': True},
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

    username = serializers.ReadOnlyField(source='user.username')
    email = serializers.CharField(source='user.email')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    last_login = serializers.ReadOnlyField(source='user.last_login')
    books_posted_count = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()

    
    def get_followers_count(self, instance):
        
        return Follow.objects.filter(followed_user=instance.user).count()

    def get_books_posted_count(self, instance):
        return Book.objects.filter(owner=instance).count()

    class Meta:
        model = UserProfile
        fields = ['id','username', 'email', 'first_name', 'last_name', 'last_login', 'phone_number', 'address', 'favorite_genres', 'notification_preferences', 'profile_picture', 'bio', 'books_posted_count', 'followers_count']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = instance.user
        instance.email = validated_data.get('email', instance.email)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.address = validated_data.get('address', instance.address)
        instance.favorite_genres = validated_data.get('favorite_genres', instance.favorite_genres)
        instance.notification_preferences = validated_data.get('notification_preferences', instance.notification_preferences)
        instance.profile_picture = validated_data.get('profile_picture', instance.profile_picture)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.save()

        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.email = user_data.get('email', user.email)
        user.save()

        return instance

# Serializer for the Follow Model
class FollowSerializer(serializers.ModelSerializer):
    follower = serializers.ReadOnlyField(source='user.username')
    following = serializers.ReadOnlyField(source='followed_user.username')


    class Meta:
        model = Follow
        fields = ['id', 'follower', 'following', 'followed_on']
    

# Serializer for the Book Model
class BookSerializer(serializers.ModelSerializer):
    # Define other fields as needed
    posted_on = serializers.ReadOnlyField()
    owner = serializers.ReadOnlyField(source='owner.user.username')
    posted_by = serializers.ReadOnlyField(source='posted_by.username')
    liked_count = serializers.SerializerMethodField()
    reviews_count = serializers.SerializerMethodField()

    def get_reviews_count(self, instance):
        return Review.objects.filter(book=instance).count()
    def get_liked_count(self, instance):
        return Like.objects.filter(book=instance).count()
   
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'genre', 'description', 'posted_on', 'price', 'book_cover', 'owner', 'posted_by', 'liked_count', 'reviews_count']

    def create(self, validated_data):
        # Assign owner based on the authenticated user
        validated_data['owner'] = self.context['request'].user.profile

        # Assign posted_by based on the authenticated user
        validated_data['posted_by'] = self.context['request'].user

        return super().create(validated_data)

# Serializer for Review Model
class ReviewSerializer(serializers.ModelSerializer):
  reviewer = serializers.HyperlinkedRelatedField(view_name='user-detail', source="reviewer.profile", read_only=True)
  class Meta:
    model = Review
    fields = ['id', 'book', 'reviewer', 'review', 'rating']

    

# Serializer for Comment Model
class CommentSerializer(serializers.ModelSerializer):
    commenter = serializers.HyperlinkedRelatedField(view_name='user-detail', source="commenter.profile", read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'book_id', 'comment', 'commented_on', 'commenter']
        read_only_fields = ['commented_on']  # Ensure this field is read-only

    def create(self, validated_data):
        # Assign commenter based on the authenticated user
        validated_data['commenter'] = self.context['request'].user

        return super().create(validated_data)


# Serializer for Like Model
class LikeSerializer(serializers.ModelSerializer):
  user = serializers.ReadOnlyField(source='user.username')
  class Meta:
    model = Like
    fields = ['id', 'user', 'book']


# Serializer for Book Cart Model
class CartItemSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source='book.title', read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'book_title', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    user = serializers.ReadOnlyField(source='user.username')
    def get_items(self, instance):
        items = instance.items.all()
        return CartItemSerializer(items, many=True).data
    class Meta:
        model = Order
        fields = ['id', 'user', 'items', 'total_price', 'created_at']



        # Serializer for strip integration
def check_expirry_month(value):
   if not re.match(r'^[0-9]{2}$', value):
       raise serializers.ValidationError('Invalid expiry month')
  
def check_expirry_year(value):
   today = datetime.datetime.now()
   if not int(value) >= today.year:
       raise serializers.ValidationError('Invalid expiry year')
   
def check_cvv(value):
   if not 3 <= len(value) <= 4:
       raise serializers.ValidationError('Invalid cvv')
   
def check_payment_method(value):
   if value not in ['card', 'paypal']:
       raise serializers.ValidationError('Invalid payment method')

class PaymentSerializer(serializers.Serializer):
    payment_method = serializers.CharField(validators=[check_payment_method])
    payment_method_id = serializers.CharField()  # Add this field for payment method ID
    card_number = serializers.CharField()
    expiry_month = serializers.CharField(validators=[check_expirry_month])
    expiry_year = serializers.CharField(validators=[check_expirry_year])
    cvv = serializers.CharField(validators=[check_cvv])
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    currency = serializers.CharField()
    description = serializers.CharField()
    order_id = serializers.IntegerField()
    user = serializers.ReadOnlyField(source='user.username')

    def create(self, validated_data):
        return validated_data

    def update(self, instance, validated_data):
        return instance
