from django.db import models
import os
from django.utils.deconstruct import deconstructible

# Create your models here.

# Model to store user profile
from django.contrib.auth.models import User
@deconstructible
class ProfileImagePathGenerator(object):
    def __init__(self):
        pass

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        path =  f"media/account/{instance.user.username}/profile_images/"
        name = f"profile_image.{ext}"
        return os.path.join(path, name)

@deconstructible
class BookCoverImagePathGenerator(object):
    def __init__(self, *args, **kwargs):
        pass

    def __call__(self, instance, filename):
        # Extract the file extension
        base_name, ext = os.path.splitext(filename)

        # Construct the directory path based on the user's ID
        path = os.path.join("media", "account", str(instance.owner.id), "images")

        # Construct the filename with a fixed name "book_cover" and the original extension
        name = f"book_cover{ext}"

        # Combine the directory path and filename to generate the full file path
        return os.path.join(path, name)


# instantiate object

book_cover_imagePath = BookCoverImagePathGenerator()

# Model to store user followings
class Follow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')
    followed_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followings')
    followed_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} followed {self.followed_user}'

class UserProfile(models.Model):
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(max_length=150, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    favorite_genres = models.CharField(max_length=100, blank=True)
    notification_preferences = models.BooleanField(default=True)
    profile_picture = models.FileField(upload_to=ProfileImagePathGenerator(), null=True, blank=True)
    bio = models.TextField(blank=True)
    
    

    def __str__(self):
        return self.user.username
    

# Model to store books
class Book(models.Model):
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='books')
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    description = models.TextField()
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='books')
    posted_on = models.DateTimeField(auto_now_add=True)
    book_cover = models.ImageField(upload_to=book_cover_imagePath, blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.title

# Model to store user reviews
class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reviews')
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    review = models.TextField()
    rating = models.FloatField()

    def __str__(self):
        return f'{self.reviewer} reviewed {self.book}'

# Model to store comments
class Comment(models.Model):
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='comments')
    commenter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    comment = models.TextField()
    commented_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.commenter} commented on {self.book_id}'

# Models to store likes and dislikes for books
class Like(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')

    def __str__(self):
        return f'{self.user} liked {self.book}'

# Model for cart books
class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Cart for {self.user.username}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    

    def __str__(self):
        return f"{self.quantity} x {self.book.title} in cart for {self.cart.user.username}"

    def get_total_price(self):
        return self.book.price * self.quantity

class Order(models.Model):
    user = models.ForeignKey(User, related_name='orders', on_delete=models.CASCADE)
    items = models.ManyToManyField(CartItem, related_name='orders')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order for {self.user.username} at {self.created_at}"

# Model to store user notifications
class Notification(models.Model):
    recipient = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} has a new notification'
    