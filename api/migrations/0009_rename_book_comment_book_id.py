# Generated by Django 5.0.2 on 2024-02-27 10:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_book_posted_by'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='book',
            new_name='book_id',
        ),
    ]