import json

from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import logout
from .models import MapData


def saveData(request):
    data = request.body.decode("utf-8")
    user = request.user

    if user.is_authenticated:
        map_object = MapData.objects.filter(user=user)

        try:
            map_object = map_object[0]
            map_object.data = data
            map_object.save()

        except IndexError:
            map_object = MapData(data=data, user=user.username)
            map_object.save()

    else:
        print("User not authenticated")
        pass
    return HttpResponseRedirect("/")


def get_data(username):
    data = MapData.objects.filter(user=username)

    try:
        data = data[0].data
    except IndexError:
        data = "[]"

    return data


def index(request):
    editable = "false"
    if request.user.is_authenticated:
        editable = "true"

    return render(
        request,
        "index.html",
        {"data": get_data(request.user.username), "editable": editable},
    )


def user_viewer(request, username):
    editable = "false"

    return render(
        request,
        "index.html",
        {"data": get_data(username), "editable": editable},
    )


def settings(request):
    data = MapData.objects.filter(user=request.user.username)
    data = data[0]

    public = data.public

    return render(
        request,
        "settings/index.html",
        {"public": public},
    )


def del_user(request):
    username = request.user.username

    data = MapData.objects.filter(user=username)
    data.delete()
    u = User.objects.get(username=username)
    u.delete()

    logout(request)

    return redirect('/')
