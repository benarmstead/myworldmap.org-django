import json

from django.http import HttpResponseRedirect
from django.shortcuts import render

from .models import MapData

# Create your views here.


def saveData(request):
    data = request.body.decode("utf-8")
    newData = MapData(1, data=data)
    newData.save()
    return HttpResponseRedirect("/")


def getData(request):
    data = MapData.objects.filter(id=1)
    data = data[0].getJSON()
    print(data)

    return render(
        request,
        "index.html",
        {"data": data},
    )
