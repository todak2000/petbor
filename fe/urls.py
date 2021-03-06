from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('signup', views.register_page, name='signup'),
    path('signin', views.login_page, name='signin'),

    path("signout", views.logout_page, name="signout"),
    path("verify/<id>", views.verify_page, name="verify"),
    path("verify_password/<id>", views.verify_password_page, name="verify_password"),
    path("forget_password", views.forget_password_page, name="forget_password"),
    path("reset_password/<id>", views.reset_password_page, name="reset_password"),

    path('user_dashboard/<token>', views.user_dashboard, name='dashboard'),

]