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
from dipl.views import FighterViewSet, UserViewSet, EventViewSet, FightViewSet
from dipl.betsView import BetViewSet
from rest_framework import routers

from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'tasks',TaskViewSet)
router.register(r'fighters',FighterViewSet)
router.register(r'users',UserViewSet)
router.register(r'events', EventViewSet)
router.register(r'fights', FightViewSet)
router.register(r'bets', BetViewSet)

urlpatterns = [
    path('',include(router.urls)),
    path('admin/', admin.site.urls),

    path('api/', include('dipl.urls'))



]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# if settings.DEBUG:
    # urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
