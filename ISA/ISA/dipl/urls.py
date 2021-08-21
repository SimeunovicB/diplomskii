from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from .views import RegisterView , LoginView, UserView, LogoutView, ChangeUserPassword, TestView, ScheduleFights, UnscheduledFighters
from .views import CreateFighter, GetFighters, GetFightsForEvent, GetFighterForFight, GetInactiveUsers, MakeUserActive, SetUserAdmin, GetUserAdmin
from .views import NumberOfUsers
from .eventsView import EventTestView, UpcomingEvents, PastEvents, AddResultsForEvent
from .betsView import GetBetsForUser


urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('user/change', ChangeUserPassword.as_view()),
    path('test', TestView.as_view()),
    path('fighter/schedule', ScheduleFights.as_view()),
    path('unscheduled/fighters', UnscheduledFighters.as_view()),
    path('fighter', CreateFighter.as_view()),
    path('fighters', GetFighters.as_view()),
    path('fights/event', GetFightsForEvent.as_view()),
    path('test/event', EventTestView.as_view()),
    path('events/upcoming', UpcomingEvents.as_view()),
    path('events/past', PastEvents.as_view()),
    path('fighter/fight', GetFighterForFight.as_view()),
    path('results/event', AddResultsForEvent.as_view()),
    path('bets/user', GetBetsForUser.as_view()),
    path('users/inactive', GetInactiveUsers.as_view()),
    path('user/active', MakeUserActive.as_view()),
    path('user/admin', SetUserAdmin.as_view()),
    path('admin', GetUserAdmin.as_view()),
    path('users/first', NumberOfUsers.as_view()),
]
