# from django.shortcuts import render
from .models import Event, Fight, Fighter, Bet
from .serializers import EventSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from datetime import datetime

class EventTestView(APIView):
    def get(self, request, format=None, *args, **kwargs):
        print("EVENT TEST VIEW")
        fights = Fight.objects.all()
        for fight in fights:
            print(fight.blueCornerFighter)
        # print("EVENTS", events)
        ide_gas("majmo")
        response = Response(
            # serializer_class.data,
            "EVENT TEST VIEW",
            content_type="application/json",
        )
        return response;

def ide_gas(markan):
    print("ma da li ide gas ", markan)


class UpcomingEvents(APIView):
    def get(self, request, format=None, *args, **kwargs):
        print("UpcomingEvents");
        upcoming_events = []
        events = Event.objects.all();
        now = datetime.now()
        for event in events:
            getEventDateSplit = event.date.split('-');
            getEventTimeSplit = event.finishTime.split(':')
            eventDate = datetime(int(getEventDateSplit[0]),int(getEventDateSplit[1]),int(getEventDateSplit[2]), int(getEventTimeSplit[0]), int(getEventTimeSplit[1]));
            if eventDate > now:
                upcoming_events.append(event);
        serializer_class = EventSerializer(upcoming_events, many=True);
        response = Response(
            serializer_class.data,
            content_type="application/json",
        )
        return response;


class PastEvents(APIView):
    def get(self, request, format=None, *args, **kwargs):
        print("PastEvents");
        past_events = []
        events = Event.objects.all();
        now = datetime.now()
        for event in events:
            getEventDateSplit = event.date.split('-');
            getEventTimeSplit = event.finishTime.split(':')
            eventDate = datetime(int(getEventDateSplit[0]),int(getEventDateSplit[1]),int(getEventDateSplit[2]), int(getEventTimeSplit[0]), int(getEventTimeSplit[1]));
            if eventDate < now:
                past_events.append(event);
        serializer_class = EventSerializer(past_events, many=True);
        response = Response(
            serializer_class.data,
            content_type="application/json",
        )
        return response;


class AddResultsForEvent(APIView):
    def put(self, request, format=None, *args, **kwargs):
        walletAddresAndPrizeMap = dict({})
        print("AddResultsForEvent")
        print(request.data["fightIds"]);
        print(request.data["winnerIds"]);
        print(request.data["methods"]);
        fightIds = request.data["fightIds"];
        winnerIds = request.data["winnerIds"];
        methods = request.data["methods"];
        i = 0;
        for fightId in fightIds:
            fight = Fight.objects.get(id = fightId);
            print(fight);
            print(winnerIds[i]['value']);
            winner_id = winnerIds[i]['value'];
            print(methods[i]['value']);
            method = methods[i]['value'];
            fight.winner_id = winner_id;
            fight.method = method;
            fight.save();
            winner = Fighter.objects.get(id = winner_id);
            winner.wins = winner.wins + 1;
            winner.save();
            if fight.redCornerFighter.id != winner_id:
                loser = fight.redCornerFighter;
                loser.losses = loser.losses + 1;
                loser.save();
            elif fight.blueCornerFighter.id != winner_id:
                loser = fight.blueCornerFighter;
                loser.losses = loser.losses + 1;
                loser.save();
            return_price_for_one_fight = dealing_with_bets(fight);
            for key in return_price_for_one_fight:
                if key not in walletAddresAndPrizeMap:
                    walletAddresAndPrizeMap[key] = return_price_for_one_fight[key];
                elif key in walletAddresAndPrizeMap:
                    walletAddresAndPrizeMap[key] = walletAddresAndPrizeMap[key] + return_price_for_one_fight[key];
            i = i + 1;
        print(walletAddresAndPrizeMap);
        response = Response(
            walletAddresAndPrizeMap,
            content_type="application/json"
        )
        return response;


def dealing_with_bets(fight):
    print("dealing_with_bets")
    print("fight ", fight)
    walletAddresAndPrizeMap = dict({})
    bets = fight.bet_set.all();
    print("bets ", bets)
    for bet in bets:
        if fight.winner_id == bet.predicted_winner:
            bet.success = "success";
            if fight.redCornerFighter.id == fight.winner_id:
                coins_won = bet.stake / fight.redCornerOdds * 100;
                user = bet.user;
                user.coins = user.coins + coins_won;
                user.save();
                if user.wallet_address not in walletAddresAndPrizeMap:
                    walletAddresAndPrizeMap[user.wallet_address] = coins_won;
                elif user.wallet_address in walletAddresAndPrizeMap:
                    walletAddresAndPrizeMap[user.wallet_address] = walletAddresAndPrizeMap[user.wallet_address] + coins_won;
            elif fight.blueCornerFighter.id == fight.winner_id:
                coins_won = bet.stake / (100 - fight.redCornerOdds) * 100;
                user = bet.user;
                user.coins = user.coins + coins_won;
                user.save();
                if user.wallet_address not in walletAddresAndPrizeMap:
                    walletAddresAndPrizeMap[user.wallet_address] = coins_won;
                elif user.wallet_address in walletAddresAndPrizeMap:
                    walletAddresAndPrizeMap[user.wallet_address] = walletAddresAndPrizeMap[user.wallet_address] + coins_won;
        elif fight.winner_id != bet.predicted_winner:
            bet.success = "failure";
            user = bet.user;
            if user.wallet_address not in walletAddresAndPrizeMap:
                walletAddresAndPrizeMap[user.wallet_address] = 0;
        bet.save();
    return walletAddresAndPrizeMap;
