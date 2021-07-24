from django.urls import path

from . import views

urlpatterns = [
    path('',views.index),                                              #tested
    path('v1/signup',views.signup), 
    path('v1/signin',views.signin),
    path('v1/verify',views.verify), 
    path('v1/resend_code',views.resend_code), 
    path('v1/forgot_password',views.forgot_password),
    path('v1/confirm_user_password',views.confirm_user_password),
    path('v1/change_password',views.change_password),

    path('v1/dashboard/<user_id>',views.dashboard),
]




    