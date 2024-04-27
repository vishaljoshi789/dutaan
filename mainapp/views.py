from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, login
from .models import CustomUser, Product, Customer, Vendor, Category, Event, Wishlist
from .serializers import UserSerializer, ProductSerializer, EventSerializer, CategorySerializer, AddressSerializer, VendorSerializer, CustomerSerializer, WishlistSerializer
from rest_framework.permissions import IsAuthenticated
import json

@api_view(['POST'])
def user_registration(request):
    if request.method == 'POST':
        data = request.data.copy()
        data["user"] = json.loads(request.data["user"])
        data["address"] = json.loads(request.data["address"])
        print(data)
        image = data.pop("user_image") if data["user"]["role"] == 'Vendor' else None
        # request.data["user"]["image"] = image
        data = data.dict()
        data = json.dumps(data)
        data = json.loads(data)
        data["user"]["image"] = image[0] if data["user"]["role"] == 'Vendor' else None
        serializer = VendorSerializer(data=data) if data["user"]["role"] == 'Vendor' else CustomerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_add_address(request):
    if request.method == 'POST':
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            user_profile = CustomUser.objects.get(username=user.username)
            serializer = UserSerializer(user_profile)
            return Response(serializer.data)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def get_category(request):
    if request.method == "GET":
        category = Category.objects.all()
        serializer = CategorySerializer(category, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def get_event(request):
    if request.method == "GET":
        event = Event.objects.all()
        serializer = EventSerializer(event, many=True)
        return Response(serializer.data)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    if request.method == "GET":
        user = request.user
        if user.role=="Vendor":
            user = Vendor.objects.get(user=user)
            serializer = VendorSerializer(user)
            serializer.data.pop("aadhar")
            serializer.data.pop("gst")
        else:
            user = Customer.objects.get(user=user)
            serializer = CustomerSerializer(user)
        
        serializer.data["user"].pop("password")
        return Response(serializer.data)
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_info(request):
    if request.method == "PUT":
        if request.data["user"]["email"] == request.user.email:
            request.data["user"].pop("email")
        if request.user.role == "Vendor":
            user = Vendor.objects.get(user = request.user)
            serializer = VendorSerializer(user, data = request.data, partial=True)
        else:
            user = Customer.objects.get(user = request.user)
            serializer = CustomerSerializer(user, data = request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_vendor_name(request):
    if request.method == "GET":
        vendor = Vendor.objects.get(id=request.GET.get('id'))
        data = {'store_name' : vendor.store_name }
        return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_product_info(request):
    if request.method == "GET":
        product = Product.objects.get(id=request.GET.get("id"))
        pserializer = ProductSerializer(product)
        if request.user.is_authenticated:
            user = request.user
            if Wishlist.objects.filter(user=user, product=product).exists():
                wishlist = Wishlist.objects.get(user=user, product=product)
                wserializer = WishlistSerializer(wishlist)
                return Response([pserializer.data, wserializer.data], status=status.HTTP_200_OK)
        return Response([pserializer.data, []], status=status.HTTP_200_OK)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_wishtlist(request):
    if request.method == "POST":
        product = Product.objects.get(id=request.data["id"])
        user = request.user
        wishlist = []
        if Wishlist.objects.filter(user=user, product=product).exists():
            Wishlist.objects.filter(user=user, product=product).delete()
            return Response(status=status.HTTP_200_OK)
        else:
            data = {}
            data['user'] = user.id
            data['product'] = product.id
            serializer = WishlistSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
