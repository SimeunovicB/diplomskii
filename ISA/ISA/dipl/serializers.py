from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import PrimaryKeyRelatedField

from .models import Fighter, Fight, User, Tournament

class FighterSerializer(ModelSerializer):

    class Meta:
        model = Fighter
        fields = ['id', 'name', 'scheduledFight']
        #fields = '__all__';

class FightSerializer(ModelSerializer):

    class Meta:
        model = Fight
        fields = ['id', 'method', 'redCornerFighter', 'blueCornerFighter', 'date']

class TournamentSerializer(ModelSerializer):
    class Meta:
        model = Tournament
        fields = ['id', 'name']

# class UserProfileSerializer(ModelSerializer):
#     # allergies = PrimaryKeyRelatedField(queryset=Medicine.objects.all(), many=True)
#
#     class Meta:
#         model = UserProfile
#         fields = [ 'id', 'email', 'name', 'surname', 'first', 'password' ]
#         # extra_kwargs = { 'password': { 'write_only': True}}
#
#     def create(self, validated_data):
#
#         user = UserProfile(
#             email = validated_data['email'],
#             name = validated_data['name'],
#             password = validated_data['password'],
#             surname = validated_data['surname'],
#             # type = validated_data['type'],
#             first = validated_data['first'],
#         )
#         user.set_password(validated_data['password'])
#         user.save()
#
#         return user
#
#
#     def put(self, validated_data):
#         print("putin breee");
#
#         user = UserProfile(
#             email = validated_data['email'],
#             name = validated_data['name'],
#             password = validated_data['password'],
#             surname = validated_data['surname'],
#         )
#         user.set_password(validated_data['password'])
#         user.save()
#         return user

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [ 'id', 'name', 'surname', 'username', 'email', 'wallet_address', 'coins', 'password']
        # extra_kwargs = { 'password': {'write_only' : True} }

        # fields = [ 'id', 'username', 'name', 'email', 'password']

    def create(self, validated_data):
        print("KREIRAJ");
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
