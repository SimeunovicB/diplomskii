from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class Fighter(models.Model):
    name = models.CharField(max_length=255, null=True)
    surname = models.CharField(max_length=255, null=True)
    image = models.ImageField(null=True, blank=True, upload_to="images/")
    wins = models.IntegerField(null=True)
    losses = models.IntegerField(null=True)
    age = models.IntegerField(null=True)
    height = models.IntegerField(null=True)
    weight = models.IntegerField(null=True)
    reach = models.IntegerField(null=True)
    scheduledFight = models.BooleanField(null=True, default=False)


class Fight(models.Model):
    redCornerFighter = models.ForeignKey(Fighter, on_delete=models.CASCADE, null=True, blank=True,related_name='redCornerFighter',  # Here
    db_column='redCornerFighter')
    blueCornerFighter = models.ForeignKey(Fighter, on_delete=models.CASCADE, null=True, blank=True,related_name='blueCornerFighter',  # Here
    db_column='blueCornerFighter')
    redCornerOdds = models.IntegerField(null=True)
    winner_id = models.IntegerField(null=True)
    method = models.CharField(max_length=255,null=True)


class Event(models.Model):
    name = models.CharField(max_length=255,null=True)
    date = models.CharField(max_length=255, null=True)
    finishTime = models.CharField(max_length=255, null=True)


class User(AbstractUser):
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255, default="Surname")
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length = 255)
    username = models.CharField(max_length=255, unique = True)
    wallet_address = models.CharField(max_length = 255, default="Wallet address")
    coins = models.FloatField(default = 100)
    # username = None
    # USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username

# class UserProfileMenager(BaseUserManager):
#
#     def create_user(self, email, name, surname, first, password=None):
#
#         if not email:
#             raise ValueError('Users must have an email')
#
#         email = self.normalize_email(email)
#         user = self.model(email=email, name=name, surname=surname, first=first)
#
#         user.set_password(password)
#         user.save(using=self._db)
#
#         return user
#
#
#     def create_superuser(self, email, name, password=None):
#         user = self.model(email=email, name=name)
#         user.is_superuser = True
#         user.is_staff = True
#         user.set_password(password)
#         user.save(using=self._db)
#         return user
#
#
# class UserProfile(AbstractBaseUser, PermissionsMixin):
#     email = models.EmailField(max_length=254, unique=True)
#     name = models.CharField(max_length=255)
#     surname = models.CharField(max_length=255,null=True)
#     # type = models.CharField(max_length=255, default="patient")
#     first = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#     objects = UserProfileMenager()
#
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['name']
#
#     def get_full_name(self):
#         return self.name
#
#     def get_short_name(self):
#         return self.name
#
#     def __str__(self):
#         return self.email
