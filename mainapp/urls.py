# basic URL Configurations
from django.urls import path, include
from . import views
 
# specify URL Path for rest_framework
urlpatterns = [
    path('register/', views.user_registration),
    path('login/', views.user_login),
    path('userInfo/', views.get_user_info),
    path('updateUserInfo/', views.update_user_info),
    path('getCategory/', views.get_category),
    path('getEvent/', views.get_event),
    path('getVendorName/', views.get_vendor_name),
    path('getProduct/', views.get_product_info),
    path('toggleWishlist/', views.toggle_wishtlist),
    path('getCart/', views.get_cart),
    path('addToCart/', views.add_cart),
    path('removeFromCart/', views.remove_cart),
    path('removeCart/', views.remove_all_cart),

]