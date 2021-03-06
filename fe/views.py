from django.shortcuts import render, redirect

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.http import JsonResponse

from decouple import config
import json
import requests

base_url = config("base_url")

def index(request):
    return render(request,"onboarding/splashscreen.html") 

def register_page(request):
    return render(request,"onboarding/register.html")

def logout_page(request):
    if 'user_id' in request.session:
        del request.session['user_id']
    return redirect('/signin')

def login_page(request):
    return render(request,"onboarding/login.html") 


def verify_page(request, id):
    return_data = {
        "id": id,
    }
    return render(request,"onboarding/verify.html", return_data) 

def verify_password_page(request, id):
    return_data = {
        "id": id,
    }
    return render(request,"onboarding/verify_password.html", return_data) 

def forget_password_page(request):
    return render(request,"onboarding/forget_password.html") 

def reset_password_page(request, id):
    return_data = {
        "id": id,
    }
    return render(request,"onboarding/reset_password.html", return_data)

def user_dashboard(request, token):
    url= base_url+"/dashboard/"+token  
    response = requests.get(url).text
    json_data = json.loads(response)
    # print(response)
    if json_data["success"] == True and  json_data["status"] == 200:
        return_data = {
            "token": token,
            "data":json_data
        } 
        return render(request,"user/user.html", return_data)
    return render(request,"onboarding/login.html")
