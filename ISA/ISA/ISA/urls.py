"""ISA URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from task.views import TaskViewSet
from dipl.views import FighterViewSet, UserViewSet, TournamentViewSet, FightViewSet
from rest_framework import routers
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

router = routers.DefaultRouter()
router.register(r'tasks',TaskViewSet)
router.register(r'fighters',FighterViewSet)
router.register(r'users',UserViewSet)
router.register(r'tournaments', TournamentViewSet)
router.register(r'fights', FightViewSet)

urlpatterns = [
    path('',include(router.urls)),
    path('admin/', admin.site.urls),

    path('api/', include('dipl.urls'))





    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]