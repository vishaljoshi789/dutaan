from django.urls import path
from . import views

urlpatterns = [
    path('getAllUsers/', views.get_all_user),
    path('get-user-data/', views.get_user_data),
    path('update-user-data/', views.update_user_data),
    path('toggle-user-status/', views.toggle_user_status),
    path('get-all-products/', views.get_all_products),
    path('add-category/', views.add_category),
    path('delete-category/', views.delete_category),
    path('add-event/', views.add_event),
    path('delete-event/', views.delete_event),
]