# Generated by Django 3.1.4 on 2021-07-23 06:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dipl', '0004_fight'),
    ]

    operations = [
        migrations.AddField(
            model_name='fight',
            name='redCornerFighter',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='dipl.fighter'),
        ),
    ]
