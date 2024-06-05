from django.contrib import admin
from .models import CustomUser, Product, Address, ProductCategory, Customer, Event, ProductEvent, Vendor, Category, ProductImage, ProductSpecification, Wishlist, Order, OrderItem
# Register your models here.

admin.site.register(CustomUser)
admin.site.register(Product)
admin.site.register(Address)
admin.site.register(Customer)
admin.site.register(Vendor)
admin.site.register(Category)
admin.site.register(Event)
admin.site.register(ProductEvent)
admin.site.register(ProductImage)
admin.site.register(ProductSpecification)
admin.site.register(Wishlist)
admin.site.register(ProductCategory)
admin.site.register(Order)
admin.site.register(OrderItem)
