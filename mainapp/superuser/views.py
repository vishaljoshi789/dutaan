from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, login
from ..models import CustomUser, Product, Customer, Vendor, Category, Event
from ..serializers import UserSerializer, ProductSerializer, EventSerializer, CategorySerializer, AddressSerializer, VendorSerializer, CustomerSerializer 
from rest_framework.permissions import IsAuthenticated, IsAdminUser
import json


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_user(request):
    if request.method == "GET":
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_user_data(request):
    if request.method == "GET":
        if(request.GET.get('type')=='Customer'):
            user = Customer.objects.get(id=request.GET.get('id'))
            serializer = CustomerSerializer(user)
        else:
            user = Vendor.objects.get(id=request.GET.get('id'))
            serializer = VendorSerializer(user)
        
        return Response(serializer.data)
    
@api_view(['POST'])
@permission_classes([IsAdminUser])
def update_user_data(request):
    if request.method == "POST":
        # print(request.data)
        user = CustomUser.objects.get(id = request.data["id"])
        serializer = UserSerializer(user, data = request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
