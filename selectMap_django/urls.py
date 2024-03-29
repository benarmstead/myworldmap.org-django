"""selectMap_django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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
from django.urls import path
from map.views import *
from users.views import *

from django.shortcuts import redirect
from django.contrib.auth import views as auth_views
from django.views.generic.base import TemplateView

urlpatterns = [
    path("robots.txt", TemplateView.as_view(
        template_name="robots.txt", content_type="text/plain")),
    path('admin/', admin.site.urls),
    path('settings/public/', settingsPublic, name="set_public"),
    path('settings/delete/', del_user, name="del_user"),
    path('settings/', settings, name="settings"),
    path('', index, name="index"),
    path('<str:username>', user_viewer),
    path('save-country/', save_country),
    path('save-points/', save_points),
    path('register/', register, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='index.html'), name='logout'),
]
