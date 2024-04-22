from django.urls import path
from . import views

urlpatterns = [
    path('getAllUsers/', views.get_all_user),
    path('get-user-data/', views.get_user_data),
    path('update-user-data/', views.update_user_data),
]