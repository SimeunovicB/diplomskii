# Generated by Django 3.1.4 on 2021-08-18 01:29

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('name', models.CharField(max_length=255)),
                ('surname', models.CharField(default='Surname', max_length=255)),
                ('email', models.CharField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('username', models.CharField(max_length=255, unique=True)),
                ('wallet_address', models.CharField(default='Wallet address', max_length=255)),
                ('coins', models.FloatField(default=100)),
                ('is_active', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, null=True)),
                ('date', models.CharField(max_length=255, null=True)),
                ('finishTime', models.CharField(max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Fighter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, null=True)),
                ('surname', models.CharField(max_length=255, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='images')),
                ('wins', models.IntegerField(null=True)),
                ('losses', models.IntegerField(null=True)),
                ('age', models.IntegerField(null=True)),
                ('height', models.IntegerField(null=True)),
                ('weight', models.IntegerField(null=True)),
                ('reach', models.IntegerField(null=True)),
                ('scheduledFight', models.BooleanField(default=False, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Fight',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('redCornerOdds', models.IntegerField(null=True)),
                ('winner_id', models.IntegerField(null=True)),
                ('method', models.CharField(max_length=255, null=True)),
                ('blueCornerFighter', models.ForeignKey(blank=True, db_column='blueCornerFighter', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='blueCornerFighter', to='dipl.fighter')),
                ('event', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='dipl.event')),
                ('redCornerFighter', models.ForeignKey(blank=True, db_column='redCornerFighter', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='redCornerFighter', to='dipl.fighter')),
            ],
        ),
        migrations.CreateModel(
            name='Bet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('predicted_winner', models.IntegerField()),
                ('stake', models.FloatField()),
                ('success', models.CharField(default='upcoming', max_length=255)),
                ('fight', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dipl.fight')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
