from django.shortcuts import render
from .models import Fighter , User, Tournament
from .serializers import FighterSerializer, TournamentSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
import jwt, datetime

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        print("ide gas")
        # username = request.data['username']
        # password = request.data['password']
        username = request.data['enteredUsername']
        password = request.data['enteredPassword']
        print(username)
        print(password)

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
        print("Ide")
        # response.set_cookie(key='jwt', value=token, httponly=True, secure=True, samesite=None)
        response.set_cookie(key='jwt', value=token, httponly=True, secure=True, samesite='None')
        print("Gas")

        return response;
        # return Response({ 'jwt' : token })

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
    permission_classes = (AllowAny,)
    queryset = Fighter.objects.all()
    serializer_class = FighterSerializer

class TournamentViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

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
