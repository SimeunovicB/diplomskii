from rest_framework import viewsets
from .models import Bet, Fight, User
from .serializers import BetSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

class BetViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = Bet.objects.all()
    serializer_class = BetSerializer

    def create(self, request):
        print("tako to ide buraz");
        print(request.data);
        fight_id = request.data["fight"];
        fight = Fight.objects.get(id=fight_id);
        predicted_winner = request.data["predicted_winner"];
        stake = float(request.data["stake"]);
        user_id = request.data["user"];
        user = User.objects.get(id=user_id);
        user.coins = user.coins - stake;
        user.save();
        addedBet = Bet.objects.create(fight=fight,predicted_winner=predicted_winner,stake=stake,user=user);
        response = Response("add a bet", content_type="application/json");
        return response;


class GetBetsForUser(APIView):
    def get(self, request, format=None, *args, **kwargs):
        print("query_params ", request.query_params);
        print("ej bre alo bre")
        user_id = request.query_params["userId"];
        user = User.objects.get(id=user_id);
        print("DZET SET ", user.bet_set.all());
        queryset = user.bet_set.all();
        serializer_class = BetSerializer(queryset, many=True);
        response = Response(serializer_class.data, content_type="application/json");
        return response;
