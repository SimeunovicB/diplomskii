# Generated by Django 3.1.4 on 2021-08-09 17:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dipl', '0033_bet'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bet',
            name='fight',
            field=models.ForeignKey(blank=True, db_column='fight', on_delete=django.db.models.deletion.CASCADE, related_name='fight', to='dipl.fight'),
        ),
    ]