# Generated by Django 3.1.4 on 2021-08-08 00:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dipl', '0031_event_results'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='results',
        ),
    ]
