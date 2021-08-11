from django.db import models
from django.contrib.auth.models import AbstractUser

def upload_path(instance, filename):
    return '/'.join(['images', str(instance.title), filename])

# Create your models here.
class Fighter(models.Model):
    name = models.CharField(max_length=255, null=True)
    surname = models.CharField(max_length=255, null=True)
    # image = models.ImageField(null=True, blank=True, upload_to=upload_path)
    image = models.ImageField(null=True, blank=True, upload_to="images")
    wins = models.IntegerField(null=True)
    losses = models.IntegerField(null=True)
    age = models.IntegerField(null=True)
    height = models.IntegerField(null=True)
    weight = models.IntegerField(null=True)
    reach = models.IntegerField(null=True)
    scheduledFight = models.BooleanField(null=True, default=False)


class Event(models.Model):
    name = models.CharField(max_length=255,null=True)
    date = models.CharField(max_length=255, null=True)
    finishTime = models.CharField(max_length=255, null=True)
    # fights = models.ForeignKey(Fight, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name


class Fight(models.Model):
    redCornerFighter = models.ForeignKey(Fighter, on_delete=models.CASCADE, null=True, blank=True,related_name='redCornerFighter',  # Here
    db_column='redCornerFighter')
    blueCornerFighter = models.ForeignKey(Fighter, on_delete=models.CASCADE, null=True, blank=True,related_name='blueCornerFighter',  # Here
    db_column='blueCornerFighter')
    redCornerOdds = models.IntegerField(null=True)
    winner_id = models.IntegerField(null=True)
    method = models.CharField(max_length=255,null=True)
    event = models.ForeignKey(Event, null=True, on_delete=models.SET_NULL)

# from django.contrib.postgres.fields import ArrayField

class User(AbstractUser):
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255, default="Surname")
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length = 255)
    username = models.CharField(max_length=255, unique = True)
    wallet_address = models.CharField(max_length = 255, default="Wallet address")
    coins = models.FloatField(default = 100)
    # bet_set = ArrayField(Bet, default = [])
    # username = None
    # USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username

class Bet(models.Model):
    fight = models.ForeignKey(Fight, on_delete=models.CASCADE)
    # fight = models.ForeignKey(Fight, on_delete=models.CASCADE, null=False, blank=True,related_name='fight',  # Here
    # db_column='fight')
    predicted_winner = models.IntegerField(null=False)
    stake = models.FloatField(null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    success = models.CharField(max_length=255, default="upcoming")
