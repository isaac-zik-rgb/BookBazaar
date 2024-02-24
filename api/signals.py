from django.db.models.signals import pre_save, post_save
from .models import UserProfile
from django.dispatch import receiver
from django.contrib.auth.models import User

# a function that create the user profile when the user is creatd with some data
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance, email=instance.email, first_name=instance.first_name, last_name=instance.last_name) 

        