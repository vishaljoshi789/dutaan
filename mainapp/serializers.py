from rest_framework import serializers
from .models import CustomUser, Product, Address, Customer, Event, Vendor, Product, ProductImage, ProductSpecification, Category, ProductCategory, ProductEvent
from django.contrib.auth.hashers import make_password



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    address = AddressSerializer()
    class Meta:
        model = Customer
        fields = ["id", "user", "address"]
    def create(self, validated_data):
        # Extract user and address data from the validated data
        user_data = validated_data.pop('user')
        address_data = validated_data.pop('address')
        user_data['password'] = make_password(user_data['password'])
        # Create the user and address instances
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        address = AddressSerializer.create(AddressSerializer(), validated_data=address_data)

        # Create the customer instance
        customer = Customer.objects.create(user=user, address=address, **validated_data)

        return customer
    
    def update(self, instance, validated_data):
        # Extract user and address data from the validated data
        user_data = validated_data.pop('user', None)
        address_data = validated_data.pop('address', None)
        # Update the user instance if user data is provided
        if user_data is not None:
            if "password" in user_data:
                user_data['password'] = make_password(user_data.get('password'))
            user_serializer = UserSerializer(instance.user, data=user_data, partial=True)
            if user_serializer.is_valid(raise_exception=True):
                user_serializer.save()

        # Update the address instance if address data is provided
        if address_data is not None:
            address_serializer = AddressSerializer(instance.address, data=address_data)
            if address_serializer.is_valid(raise_exception=True):
                address_serializer.save()

        # Update the customer instance with any remaining validated data
        super(CustomerSerializer, self).update(instance, validated_data)
        return instance

class VendorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    address = AddressSerializer()
    
    class Meta:
        model = Vendor
        fields = ["id", "user", "address", "store_name", "store_description", "aadhar", "gst"]

    def create(self, validated_data): # Get the request object
        print(validated_data)
        # Extract user and address data from the validated data
        user_data = validated_data.pop('user')
        address_data = validated_data.pop('address')
        user_data['password'] = make_password(user_data['password'])

        # Create the user and address instances
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        address = AddressSerializer.create(AddressSerializer(), validated_data=address_data)

        # Modify the user data before saving

        # Create the vendor instance
        vendor = Vendor.objects.create(user=user, address=address, **validated_data)

        return vendor
    
    def update(self, instance, validated_data):
        # Extract user and address data from the validated data
        user_data = validated_data.pop('user', None)
        address_data = validated_data.pop('address', None)
        # Update the user instance if user data is provided
        if user_data is not None:
            if "password" in user_data:
                user_data['password'] = make_password(user_data.get('password'))
            user_serializer = UserSerializer(instance.user, data=user_data, partial=True)
            if user_serializer.is_valid(raise_exception=True):
                user_serializer.save()

        # Update the address instance if address data is provided
        if address_data is not None:
            address_serializer = AddressSerializer(instance.address, data=address_data, partial=True)
            if address_serializer.is_valid(raise_exception=True):
                address_serializer.save()

        # Update the customer instance with any remaining validated data
        super(VendorSerializer, self).update(instance, validated_data)
        return instance

    def to_representation(self, instance):
        # Override to_representation method to include user image
        representation = super().to_representation(instance)
        representation['user']['image'] = instance.user.image.url if instance.user.image else None
        return representation

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'product', 'image']


class ProductSpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSpecification
        fields = ['id', 'key', 'value']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'event']

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'category', 'product']

class ProductEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductEvent
        fields = ['id', 'event', 'product']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True)
    specifications = ProductSpecificationSerializer(many=True)
    category = ProductCategorySerializer(many=True)
    event = ProductEventSerializer(many=True)

    class Meta:
        model = Product
        fields = ['id', 'images', 'specifications', 'category', 'event', 'name', 'description', 'mrp', 'sell_price', 'price', 'stock_quantity', 'is_active', 'vendor', 'video']

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        specifications_data = validated_data.pop('specifications', [])
        categories = validated_data.pop("category", [])
        events = validated_data.pop("event", [])
        product = Product.objects.create(**validated_data)
        
        for image_data in images_data:
            ProductImage.objects.create(product=product, image=image_data['image'])

        for spec_data in specifications_data:
            ProductSpecification.objects.create(product=product, key=spec_data['key'], value=spec_data['value'])

        for category in categories:
            ProductCategory.objects.create(product=product, category = category['category'])

        for event in events:
            ProductEvent.objects.create(product=product, event = event['event'])

        
        return product

    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', [])
        videos_data = validated_data.pop('videos', [])
        specifications_data = validated_data.pop('specifications', [])
        
        # Update the product instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update or create product images
        for image_data in images_data:
            image_id = image_data.get('id', None)
            if image_id:
                image_instance = ProductImage.objects.get(id=image_id, product=instance)
                image_instance.image = image_data.get('image', image_instance.image)
                image_instance.save()
            else:
                ProductImage.objects.create(product=instance, **image_data)
        
        # Update or create product videos
        for video_data in videos_data:
            video_id = video_data.get('id', None)
            # if video_id:
            #     video_instance = ProductVideo.objects.get(id=video_id, product=instance)
            #     video_instance.video = video_data.get('video', video_instance.video)
            #     video_instance.save()
            # else:
            #     ProductVideo.objects.create(product=instance, **video_data)
        
        # Update or create product specifications
        for spec_data in specifications_data:
            spec_id = spec_data.get('id', None)
            if spec_id:
                spec_instance = ProductSpecification.objects.get(id=spec_id, product=instance)
                spec_instance.key = spec_data.get('key', spec_instance.key)
                spec_instance.value = spec_data.get('value', spec_instance.value)
                spec_instance.save()
            else:
                ProductSpecification.objects.create(product=instance, **spec_data)
        
        return instance

