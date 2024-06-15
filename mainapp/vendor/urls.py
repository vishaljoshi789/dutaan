from django.urls import path
from . import views

urlpatterns = [
    path('myproducts/', views.get_vendor_products),
    path('addProduct/', views.add_product),
    path('getProduct/', views.get_product_info),
    path('updateProduct/', views.update_product),
    path('toggleProductStatus/', views.toggleProductStatus),
    path('getOrders/', views.orders),
    path('getOrderItems/', views.order_content),
]