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


def getData(request):
    user  = request.user
    data = MapData.objects.filter(user=user.username)
    
    try:
        data = data[0].getJSON()
    except IndexError:
        data = "[]"

    return render(
        request,
        "index.html",
        {"data": data},
    )