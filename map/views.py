import json

from django.http import HttpResponseRedirect
from django.shortcuts import render

from .models import MapData

# Create your views here.


def saveData(request):
    data = json.loads(request.body.decode("utf-8"))["data"]

    print(data)
    newData = ""
    for i in data:
        newData += str(i) + ","
    data = newData

    newData = MapData(1, data)
    newData.save()

    return HttpResponseRedirect("/")


def getData(request):
    data = MapData.objects.filter(id=1)
    data.values()

    return render(
        request,
        "index.html",
        {"data": data},
    )
