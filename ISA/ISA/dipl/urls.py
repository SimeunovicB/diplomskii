from django.contrib import admin
from django.urls import path, include
from .views import RegisterView , LoginView, UserView, LogoutView, ChangeUserPassword, TestView, ScheduleFights, UnscheduledFighters

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('user/change', ChangeUserPassword.as_view()),
    path('test', TestView.as_view()),
    path('fighter/schedule', ScheduleFights.as_view()),
    path('unscheduled/fighters', UnscheduledFighters.as_view()),
]
