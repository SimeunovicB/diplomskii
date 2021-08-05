# from django.shortcuts import render
from .models import  Event
from .serializers import EventSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from datetime import datetime

class EventTestView(APIView):
    def get(self, request, format=None, *args, **kwargs):
        print("EVENT TEST VIEW")
        events = Event.objects.all()
        for event in events:
            print(event.fight_set.all())
        print("EVENTS", events)
        response = Response(
            # serializer_class.data,
            "EVENT TEST VIEW",
            content_type="application/json",
        )
        return response;


class UpcomingEvents(APIView):
    def get(self, request, format=None, *args, **kwargs):
        print("UpcomingEvents");
        upcoming_events = []
        events = Event.objects.all();
        upcoming_events = [];
        now = datetime.now()
        for event in events:
            getEventDateSplit = event.date.split('-');
            getEventTimeSplit = event.finishTime.split(':')
            eventDate = datetime(int(getEventDateSplit[0]),int(getEventDateSplit[1]),int(getEventDateSplit[2]), int(getEventTimeSplit[0]), int(getEventTimeSplit[1]));
            print(eventDate," ",now);
            if eventDate > now:
                print("vece");
                upcoming_events.append(event);
            else:
                print("manje");
        serializer_class = EventSerializer(upcoming_events, many=True);
        response = Response(
            serializer_class.data,
            content_type="application/json",
        )
        return response;
