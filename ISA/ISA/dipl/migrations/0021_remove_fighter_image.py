# Generated by Django 3.1.4 on 2021-07-26 17:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dipl', '0020_fighter_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='fighter',
            name='image',
        ),
    ]
