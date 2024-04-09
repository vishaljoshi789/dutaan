# basic URL Configurations
from django.urls import path
from . import views
 
# specify URL Path for rest_framework
urlpatterns = [
    path('register/', views.user_registration),
    path('login/', views.user_login),
    path('myproducts/', views.get_vendor_products),
    path('userInfo/', views.get_user_info),
    path('updateUserInfo/', views.update_user_info),
    path('getAllUsers/', views.get_all_user),
    path('get-user-data/', views.get_user_data),
    path('update-user-data/', views.update_user_data),
]