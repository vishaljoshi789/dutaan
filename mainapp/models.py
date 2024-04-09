from django.contrib.auth.models import AbstractUser
from django.db import models


def user_directory_path(instance, filename): 
  
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename> 
    return 'user_{0}/{1}'.format(instance.username, filename) 

class CustomUser(AbstractUser):
    name = models.CharField(max_length = 50, null=True, blank=True)
    roles_choices = {"Customer": "Customer", "Vendor":"Vendor"}
    gender_choices = {"Male": "Male", "Female":"Female"}
    email = models.EmailField(unique = True, null=False, blank=False)
    phone = models.CharField(max_length = 18, null=True, blank=True)
    # address = models.CharField(max_length = 255, null=True, blank=True)
    role = models.CharField(max_length=10, null=True, blank=True, choices=roles_choices)
    image = models.ImageField(upload_to=user_directory_path, null=True)
    gender = models.CharField(max_length=10, null=True, blank=True, choices=gender_choices)

class Address(models.Model):
    street_address = models.CharField(max_length=50, null=True, blank=True)
    city = models.CharField(max_length=50, null=True, blank=True)
    state = models.CharField(max_length=50, null=True, blank=True)
    zip_code = models.CharField(max_length=50, null=True, blank=True)
    country = models.CharField(max_length=50, null=True, blank=True)

class Customer(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, related_name="user")
    address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name="address")

class Vendor(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    store_name = models.CharField(max_length=100, null=True, blank=True)
    store_description = models.TextField(null=True, blank=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    gst = models.CharField(max_length=20, null=True, blank=True)
    aadhar = models.CharField(max_length=15, null=True, blank=True)

class Category(models.Model):
    category_name = models.CharField(max_length = 100, null=True, blank=True)


class Product(models.Model):
    name = models.CharField(max_length = 255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, blank=True, null=True)
    mrp = models.IntegerField(null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    sell_price = models.IntegerField(null=True, blank=True)
    stock_quantity = models.IntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class ProductVideo(models.Model):
    product = models.ForeignKey(Product, related_name='videos', on_delete=models.CASCADE)
    video = models.FileField(upload_to=user_directory_path)

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=user_directory_path)

class ProductSpecification(models.Model):
    product = models.ForeignKey(Product, related_name='specifications', on_delete=models.CASCADE)
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)


# class Order(models.Model):
#     status_choices = {"Processing": "Processing", "Dispatched":"Dispatched", "Delivered": "Delivered"}
#     user = models.ForeignKey(Customer, on_delete=models.CASCADE)
#     amount = models.IntegerField(null=True, blank=True)
#     date = models.DateTimeField(auto_now_add = True)
#     status = models.CharField(max_length=20, null=True, blank=True, choices=status_choices)
