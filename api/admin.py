from django.contrib import admin
from .models import UserProfile, Follow, Book, Review, Comment, Like, Cart, CartItem, Order
from .models import Notification
# Register your models here.

admin.site.register(UserProfile)
admin.site.register(Follow)
admin.site.register(Book)
admin.site.register(Review)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Order)

admin.site.register(Notification)
# Compare this snippet from api/admin.py:
