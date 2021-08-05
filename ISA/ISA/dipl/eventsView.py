# from django.shortcuts import render
from .models import  Event
from .serializers import EventSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

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
