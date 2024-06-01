from django.contrib.auth.models import AbstractUser
from django.db import models


def user_directory_path(instance, filename): 
  
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename> 
    return 'user_{0}/{1}'.format(instance.username, filename) 
def video_directory_path(instance, filename): 
  
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename> 
    return 'product_{0}/{1}'.format(instance.name, filename) 

def image_directory_path(instance, filename): 
  
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename> 
    return 'product_{0}/{1}'.format("image", filename) 

def website_images_path(instance, filename): 
  
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename> 
    return 'website_{0}/{1}'.format("image", filename)

class CustomUser(AbstractUser):
    status_choices = {"Active": "Active", "Inactive":"Inactive"}
    name = models.CharField(max_length = 50, null=True, blank=True)
    roles_choices = {"Customer": "Customer", "Vendor":"Vendor"}
    gender_choices = {"Male": "Male", "Female":"Female"}
    
    email = models.EmailField(unique = True, null=False, blank=False)
    phone = models.CharField(max_length = 18, null=True, blank=True)
    # address = models.CharField(max_length = 255, null=True, blank=True)
    role = models.CharField(max_length=10, null=True, blank=True, choices=roles_choices)
    image = models.ImageField(upload_to=user_directory_path, null=True)
    gender = models.CharField(max_length=10, null=True, blank=True, choices=gender_choices)
    status = models.CharField(default="Active", max_length=10, null=True, blank=True, choices=status_choices)

class Address(models.Model):
    user = models.ForeignKey(CustomUser, related_name='addresses', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=50, null=True, blank=True)
    contact = models.CharField(max_length=15, null=True, blank=True)
    street_address = models.CharField(max_length=200, null=True, blank=True)
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
    category = models.CharField(max_length = 100, null=True, blank=True)
    image = models.ImageField(upload_to=website_images_path, null=True, blank=True)

    def __str__(self):
        return self.category

class Event(models.Model):
    event = models.CharField(max_length = 100, null=True, blank=True)
    image = models.ImageField(upload_to=website_images_path, null=True, blank=True)

    


class Product(models.Model):
    status_choices = {"Active": "Active", "Inactive":"Inactive", "Banned":"Banned"}
    name = models.CharField(max_length = 255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, blank=True, null=True)
    mrp = models.IntegerField(null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    sell_price = models.IntegerField(null=True, blank=True)
    stock_quantity = models.IntegerField(null=True, blank=True)
    image = models.ImageField(upload_to=image_directory_path, null=True, blank=True)
    video = models.FileField(upload_to=video_directory_path, null=True, blank=True)
    status = models.CharField(default="Active", max_length=10, null=True, blank=True, choices=status_choices)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    
    def __str__(self):
        return str(self.id)


class ProductEvent(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True, related_name="event")
    # def __str__(self):
    #     return self.product

class ProductCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True, related_name='category')
    def __str__(self):
        return self.category.category


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(upload_to=image_directory_path, null=True, blank=True)

class ProductSpecification(models.Model):
    product = models.ForeignKey(Product, related_name='specifications', on_delete=models.CASCADE)
    key = models.CharField(max_length=255, blank=True, null=True)
    value = models.CharField(max_length=255, blank=True, null=True)

class ProductReview(models.Model):
    product = models.ForeignKey(Product, related_name='review', on_delete=models.CASCADE)
    review = models.IntegerField(null=True, blank=True)
    feedback = models.TextField(null=True, blank=True)

class Cart(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, related_name='cart', on_delete=models.CASCADE)
    quantity = models.IntegerField(null=True, blank=True)

class Wishlist(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, related_name='wishlist', on_delete=models.CASCADE)


class Order(models.Model):
    status_choices = {"Processing": "Processing", "Dispatched":"Dispatched", "Delivered": "Delivered", "Cancelled": "Cancelled"}
    user = models.ForeignKey(Customer, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, null=True, blank=True, decimal_places=2)
    shipping = models.DecimalField(max_digits=10, null=True, blank=True, decimal_places=2)
    date = models.DateTimeField(auto_now_add = True)
    status = models.CharField(max_length=20, null=True, blank=True, choices=status_choices)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()


class Payment(models.Model):
    PAYMENT_METHODS = (
        ('Online', 'Online'),
        ('Cash On Delivery', 'Cash On Delivery'),
    )

    order = models.OneToOneField(Order, related_name='payment', on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    transaction_id = models.CharField(max_length=100, null=True, blank=True)  # for online payments
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)