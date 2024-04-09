from django.contrib import admin
from .models import CustomUser, Product, Address, Customer, Vendor
# Register your models here.

admin.site.register(CustomUser)
admin.site.register(Product)
admin.site.register(Address)
admin.site.register(Customer)
admin.site.register(Vendor)
