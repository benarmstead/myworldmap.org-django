from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.db import models

class UserRegistrationForm(UserCreationForm):
    #first_name = forms.CharField(max_length=101)
    #last_name = forms.CharField(max_length=101)
    #email = forms.EmailField()

    class Meta:
        model = User
        # 'first_name', 'last_name', 'email',
        fields = ['username', 'password1', 'password2']