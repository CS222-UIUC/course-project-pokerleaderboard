"""pokerleaderboard URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from rest_framework import routers
from . import views 

router = routers.DefaultRouter()

router.register('players', views.PlayerViewSet, basename='player')
router.register('games', views.GameViewSet, basename='game')
router.register('buy-ins', views.BuyInViewSet, basename='buyin')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('start_game/', views.GameViewSet.as_view({'post': 'start_game'}), name='start_game'),
    path('games/<int:pk>/end_game/', views.GameViewSet.as_view({'post': 'end_game'}), name='end_game'),
    # path('', views.leaderboard_view, name='leaderboard'), # TODO this needs to be linked to the frontend html
    path('accounts/', include('django.contrib.auth.urls')),
    path('', views.index, name='index'),
    path('', include('accounts.urls'))
]
