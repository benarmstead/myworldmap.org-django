from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib import messages
from .forms import UserRegistrationForm


def home(request):
    return render(request, 'index.html')


def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            #BANNED_NAMES = ["save", "settings", "login", "logout", ]
            # if form.username in BANNED_NAMES:
            #    return

            user = form.save()

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
    return render(request, "settings/index.html")
