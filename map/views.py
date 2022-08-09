import json

from django.http import HttpResponseRedirect
from django.shortcuts import render

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


def get_data(request, username, editable):
    data = MapData.objects.filter(user=username)

    try:
        data = data[0].data
    except IndexError:
        data = "[]"

    return render(
        request,
        "index.html",
        {"data": data, "editable": editable},
    )


def index(request):
    editable = "false"
    if request.user.is_authenticated:
        editable = "true"

    return get_data(request, request.user.username, editable)


def user_viewer(request, username):
    return get_data(request, username, "false")
