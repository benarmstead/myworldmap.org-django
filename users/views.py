from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib import messages
from .forms import UserRegistrationForm
from map.models import MapData


def home(request):
    return render(request, 'index.html')


def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            MapData(data=[], points=[], user=user.username).save()

            messages.success(
                request, f'Your account has been created. You can log in now!'
            )

            login(request, user)
            return redirect('/')
    else:
        form = UserRegistrationForm()

    context = {'form': form}
    return render(request, 'users/register.html', context)


def profile(request):
    return render(request, "users/profile.html")


def settings(request):
    data = MapData.objects.filter(user=request.user.username)[0]

    return render(
        request,
        "settings/index.html",
        {"public": data.public},
    )


def settingsPublic(request):
    data = MapData.objects.filter(user=request.user.username)[0]

    if request.method == 'POST':
        box = request.POST.get("setPublic")
        if (box == "on"):
            data.public = True
        else:
            data.public = False

        data.save()

    return redirect("/settings/")
