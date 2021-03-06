from django.shortcuts import render
from .models import Fighter , User, Event, Fight
from .serializers import FighterSerializer, EventSerializer, FightSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from .permissions import HasPermission, HasNoPermission, AdminViewSetPermission, MakeUserActivePermission;
import jwt, datetime

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        username = request.data['enteredUsername']
        password = request.data['enteredPassword']
        user = User.objects.filter(username=username).first()
        if user is None:
            raise AuthenticationFailed('User not found!')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')
        print("USER")
        print(user)
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes = 60),
            'iat': datetime.datetime.utcnow()
        }
        print("PAYLOAD")
        print(payload)
        token = jwt.encode(payload, "secret", algorithm="HS256")
        print(token)
        response = Response( { 'jwt' : token })
        response.set_cookie(key='jwt', value=token, httponly=True, secure=True, samesite='None')
        return response;


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        print("TOKEN")
        print(token)
        print("IDE GAS")
        if not token:
            print("UNAUTH")
            raise AuthenticationFailed("Unauthenticated!")

        try:
            print("TRY")
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            print("EXCEPT")
            raise AuthenticationFailed("Unauthenticated!")
        print("NASTAVAK")
        print(payload)
        print(payload["id"])
        # user = User.objects.get(id = payload['id'])
        user = User.objects.filter(id = payload['id']).first()
        print(user)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        print("idemo")
        response = Response()
        response.set_cookie(key='jwt', httponly=True, secure=True, samesite='None')
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response

class FighterViewSet(viewsets.ModelViewSet):
    # authentication_classes = (BasicAuthentication,)
    # permission_classes = (HasPermission,)
    # authentication_classes = (IsAuthenticated,)
    permission_classes = (AdminViewSetPermission,)
    queryset = Fighter.objects.all()
    serializer_class = FighterSerializer

    def post(self, request, *args, **kwargs):
        print("ide gas post")

    # def create(self, request):
    #     print("CreateFighter")
    #     name = request.data['name'];
    #     surname = request.data['surname'];
    #     wins = request.data['wins'];
    #     losses = request.data['losses'];
    #     age = request.data['age'];
    #     height = request.data['height'];
    #     weight = request.data['weight'];
    #     reach = request.data['reach'];
    #     image = request.data['image']
    #     Fighter.objects.create(name=name,surname=surname,image=image,wins=wins,losses=losses,age=age,height=height,weight=weight,reach=reach);
    #     print("image", image);
    #     # serializer_class = FighterSerializer(queryset,many=True);
    #     response = Response(
    #         {
    #             "message": "Fighter created"
    #         },
    #         content_type="application/json",
    #     )
    #     return response;


class FightViewSet(viewsets.ModelViewSet):
    # authentication_classes = (BasicAuthentication,)
    # permission_classes = (HasPermission,)
    # authentication_classes = (IsAuthenticated,)
    permission_classes = (AdminViewSetPermission,)
    queryset = Fight.objects.all()
    serializer_class = FightSerializer


    def create(self, request):
        print("ALO DRUGARI")
        redCornerFighterId = request.data["redCornerFighter"];
        redCornerFighter = Fighter.objects.get(id=redCornerFighterId);
        blueCornerFighterId = request.data["blueCornerFighter"];
        blueCornerFighter = Fighter.objects.get(id=blueCornerFighterId);
        redCornerOdds = request.data["redCornerOdds"];
        eventId = request.data["eventId"];
        event = Event.objects.get(id=eventId);
        print("EVENT ",event);
        redCornerFighter.scheduledFight = True;
        redCornerFighter.save();
        blueCornerFighter.scheduledFight = True;
        blueCornerFighter.save();
        addedFight = Fight.objects.create(redCornerFighter=redCornerFighter,blueCornerFighter=blueCornerFighter,redCornerOdds=redCornerOdds,event=event)
        # serializer_class = FightSerializer(addedFight, many=True)
        response = Response(
            # serializer_class.data,
            "Cao brate moj",
            content_type="application/json",
        )
        return response;


class EventViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    permission_classes = (AdminViewSetPermission,)
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class UserViewSet(viewsets.ModelViewSet):
    # authentication_classes = (BasicAuthentication,)
    # permission_classes = (HasPermission,)
    # authentication_classes = (IsAuthenticated,)
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ChangeUserPassword(APIView):
    def put(self, request, format=None, *args, **kwargs):
        # authentication_classes = (TokenAuthentication,)
        # permission_classes = (permissions.UpdateOwnProfile,)
        print("CHANGE USER PASSWORD")
        user_id = request.data["id"]
        print(user_id)
        password = request.data["password"]
        print(password)
        user = User.objects.get(id = user_id)
        print(user)
        user.set_password(password)
        user.save()
        response = Response(
            # serializer_class.data,
            user.password,
            content_type="application/json",
        )
        return response;

class ScheduleFights(APIView):
    def put(self, request, format=None, *args, **kwargs):
        print("ScheduleFights")
        red_corner_fighter_id = request.data["redCornerFighter"]
        blue_corner_fighter_id = request.data["blueCornerFighter"]
        red_corner_fighter = Fighter.objects.get(id = red_corner_fighter_id)
        blue_corner_fighter = Fighter.objects.get(id = blue_corner_fighter_id)
        red_corner_fighter.scheduledFight = True
        red_corner_fighter.save()
        blue_corner_fighter.scheduledFight = True
        blue_corner_fighter.save()
        response = Response(
            # serializer_class.data,
            "true",
            content_type="application/json",
        )
        return response;

class UnscheduledFighters(APIView):
    def get(self, request, format=None, *args, **kwargs):
        unscheduled_fighters = Fighter.objects.filter(scheduledFight = False)
        serializer_class = FighterSerializer(unscheduled_fighters, many=True)
        response = Response(
            serializer_class.data,
            content_type="application/json",
        )
        return response;


class CreateFighter(APIView):
    queryset = Fighter.objects.all()
    serializer_class = FighterSerializer

    def post(self, request, format=None, *args, **kwargs):
        print("CreateFighter")
        print(request)
        name = request.data['name'];
        surname = request.data['surname'];
        wins = request.data['wins'];
        losses = request.data['losses'];
        age = request.data['age'];
        height = request.data['height'];
        weight = request.data['weight'];
        reach = request.data['reach'];
        image = request.data['image']
        print("name", name);
        print("surname", surname);
        print("wins", wins);
        print("losses", losses);
        print("age", age);
        print("height", height);
        print("weight", weight);
        print("reach", reach);
        print("image", image);
        Fighter.objects.create(name=name,surname=surname,image=image,wins=wins,losses=losses,age=age,height=height,weight=weight,reach=reach);

        # Fighter.objects.create(name=name,surname=surname,image=image,wins=wins,losses=losses,age=age,height=height,weight=weight,reach=reach);
        # print("image", image);
        # serializer_class = FighterSerializer(queryset,many=True);

        response = Response(
            {
                "message": "Fighter created"
            },
            content_type="application/json",
        )
        return response;

class GetFighters(APIView):
    def get(self, request, format=None, *args, **kwargs):
        print("GetFighters")
        fighters = Fighter.objects.all()
        print(fighters)
        serializer_class = FighterSerializer(fighters, many=True)
        response = Response(
            serializer_class.data,
            content_type="application/json",
        )
        return response;

class GetFightsForEvent(APIView):
    def get(self, request, format=None, *args, **kwargs):
        queryset = [];
        permission_classes = (HasPermission,)
        eventId = request.query_params['eventId'];
        event = Event.objects.get(id=eventId);
        fightsFromEvent = event.fight_set.all();
        events = Event.objects.all();
        serializer_class = FightSerializer(fightsFromEvent, many=True)
        response = Response(
            serializer_class.data,
            content_type="application/json",
        )
        return response;


class GetFighterForFight(APIView):
    def get(self, request, format=None, *args, **kwargs):
        queryset = [];
        fighter_id = request.query_params['id'];
        fighter = Fighter.objects.get(id=fighter_id);
        queryset.append(fighter);
        serializer_class = FighterSerializer(queryset, many=True)
        response = Response(
            serializer_class.data,
            content_type="application/json",
        )
        return response;


class GetInactiveUsers(APIView):
    def get(self, request, format=None, *args, **kwargs):
        print("ide gas");
        users = []
        users = User.objects.filter(is_active=False);
        print(users);
        serializer_class = UserSerializer(users, many=True);
        response = Response(serializer_class.data, content_type="application/json");
        return response;


class MakeUserActive(APIView):
    def put(self, request, format=None, *args, **kwargs):
        print("MakeUserActive");
        if MakeUserActivePermission.has_permission(self,request) == False:
            return Response({"detail": "You don't have permission to make a user active."}, status=401)
        user_id = request.data["userId"];
        user = User.objects.get(id=user_id);
        user.is_active = True;
        user.save();
        serializer_class = UserSerializer(user);
        response = Response(serializer_class.data, content_type="application/json");
        return response;


class SetUserAdmin(APIView):
    def put(self, request, format=None, *args, **kwargs):
        print("SetUserAdmin");
        user_id = request.data["userId"];
        user = User.objects.get(id=user_id);
        user.is_superuser = True
        user.is_active = True
        user.save();
        response = Response("true", content_type="application/json");
        return response;


class GetUserAdmin(APIView):
    def get(self, request, format=None, *args, **kwargs):
        print("GetUserAdmin");
        user = User.objects.get(id=1);
        serializer_class = UserSerializer(user);
        response = Response(serializer_class.data, content_type="application/json");
        return response;


class NumberOfUsers(APIView):
    def get(self, request, format=None, *args, **kwargs):
        print("NumberOfUsers");
        isUserFirst = "no";
        numberOfUsers = len(User.objects.all());
        if numberOfUsers == 0:
            isUserFirst = "yes";
        response = Response(isUserFirst);
        return response;


class TestView(APIView):
    def get(self, request, format=None, *args, **kwargs):
        print("TEST VIEW")
        print(request);
        a = 1;
        b = "1";
        if a == b:
            print("a = b");
        elif a != b:
            print("a != b")
        response = Response(
            # serializer_class.data,
            "TEST VIEW",
            content_type="application/json",
        )
        return response;
