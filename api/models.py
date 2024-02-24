from django.db import models

# Create your models here.

# Model to store user profile
from django.contrib.auth.models import User

class UserProfile(models.Model):
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(max_length=150, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    favorite_genres = models.CharField(max_length=100, blank=True)
    notification_preferences = models.BooleanField(default=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True)
    bio = models.TextField(blank=True)
    books_posted = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username
