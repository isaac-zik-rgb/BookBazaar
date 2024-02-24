from django.contrib.auth.models import User
from django.db.models.signals import pre_save, post_save
from .models import UserProfile
from django.dispatch import receiver

# a function that create the user profile when the user is creatd with some data
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        profile = UserProfile.objects.create(user=instance)
        profile.username = instance.username
        profile.email = instance.email
        profile.first_name = instance.first_name
        profile.last_name = instance.last_name
        profile.last_login = instance.last_login
        profile.save()
        