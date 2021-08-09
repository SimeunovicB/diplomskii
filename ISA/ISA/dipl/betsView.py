from rest_framework import viewsets
from .models import Bet
from .serializers import BetSerializer
from rest_framework.permissions import AllowAny

class BetViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = Bet.objects.all()
    serializer_class = BetSerializer
