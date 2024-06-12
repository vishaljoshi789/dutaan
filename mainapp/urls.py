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
    path('clearCart/', views.clear_cart),
    path('getCartCount/', views.get_cart_count),
    path('products/', views.get_products),
    path('getProductsByCategory/', views.get_products_by_category),
    path('getUserAddress/', views.get_user_address),
    path('addUserAddress/', views.user_add_address),
    path('getAddress/', views.get_address),
    path('placeOrder/', views.place_order),
    path('getOrders/', views.get_orders),
    path('getOrderItems/', views.get_order_items),
    path('getOrder/', views.get_order_details),
    path('addPayment/', views.add_payment),

]