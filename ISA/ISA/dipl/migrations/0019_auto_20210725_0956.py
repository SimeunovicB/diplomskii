# Generated by Django 3.1.4 on 2021-07-25 07:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dipl', '0018_auto_20210725_0951'),
    ]

    operations = [
        migrations.AddField(
            model_name='fighter',
            name='height',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='fighter',
            name='reach',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='fighter',
            name='weight',
            field=models.IntegerField(null=True),
        ),
    ]