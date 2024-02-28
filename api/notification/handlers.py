from django.dispatch import receiver
from api.models import Notification
from .signals import user_followed, book_liked, book_commented, user_registered

@receiver(user_followed)
def create_foolow_notification(sender, follower, followed_user, **kwargs):

    Notification.objects.create(
        recipient=followed_user,
        cntent=f'{follower.username} Started following you'
    )

@receiver(book_liked)
def create_like_notification(sender, liker, book, **kwargs):

    Notification.objects.create(
        recipient=book.user,
        content=f'{liker.username} liked your book {book.title}'
    )

@receiver(book_commented)
def create_comment_notification(sender, commenter, book, **kwargs):

    Notification.objects.create(
        recipient=book.user,
        content=f'{commenter.username} commented on your book {book.title}'
    )

@receiver(user_registered)
def create_user_registered_notification(sender, user, **kwargs):

    Notification.objects.create(
        recipient=user,
        content=f'Welcome to BookBazzar, You have sucessfully registered {user.username}'
    )