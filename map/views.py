import json

from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import logout
from .models import MapData


def save_country(request):
    map_object = MapData.objects.filter(user=request.user)[0]
    map_object.data = request.body.decode("utf-8")
    map_object.save()

    return HttpResponseRedirect("/")


def save_points(request):
    map_object = MapData.objects.filter(user=request.user)[0]
    map_object.points = request.body.decode("utf-8")
    map_object.save()

    return HttpResponseRedirect("/")


def renderer(request, username, editable):
    mapObj = MapData.objects.filter(user=username)[0]
    return render(
        request,
        "index.html",
        {
            "data": mapObj.data,
            "points": mapObj.points,
            "public": mapObj.public,
            "editable": editable,
        },
    )


def index(request):
    if request.user.is_authenticated:
        return renderer(request, request.user.username, "true")
    return render(
        request,
        "index.html",
        {
            "data": [],
            "points": [],
            "editable": "false"
        },
    )


def user_viewer(request, username):
    banned = ["favicon.ico"]
    if (
            username in banned or
            not MapData.objects.filter(user=username)[0].public
    ):
        return render(
            request,
            "index.html"
        )
    return renderer(request, username, "false")


def del_user(request):
    MapData.objects.filter(user=request.user.username).delete()
    User.objects.get(username=request.user.username).delete()
    logout(request)

    return redirect('/')
