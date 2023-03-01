from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Player(models.Model):
    current_amount = models.DecimalField(max_digits=15, decimal_places=2,default=0)
    peak_amount = models.PositiveIntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return "yolo"

class Game(models.Model):
    date_time = models.DateTimeField(null=True)
    players = models.ManyToManyField(Player)
    buy_in = models.PositiveIntegerField(null=True)
    is_finished = models.BooleanField()

class BuyIn(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField()
