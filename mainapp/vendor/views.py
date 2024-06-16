from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, login
from ..models import CustomUser, Product, Customer, Vendor, Category, Event, Order, OrderItem
from ..serializers import  ProductSerializer, OrderItemProductSerializer, OrderSerializer
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from ..permissions import isVendor
import json

@permission_classes([IsAuthenticated, isVendor])
@api_view(['GET'])
def get_vendor_products(request):
    if request.method == "GET":
        user = Vendor.objects.get(user=request.user)
        products = user.product_set.all().order_by('-created_at')
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

@permission_classes([IsAuthenticated, isVendor])
@api_view(['GET'])
def get_product_info(request):
    if request.method == "GET":
        user = Vendor.objects.get(user=request.user)
        product = user.product_set.get(id=request.GET.get("id"))
        serializer = ProductSerializer(product)
        return Response(serializer.data)



    
@permission_classes([IsAuthenticated, isVendor])
@api_view(['POST'])
def add_product(request):
    if request.method == "POST":
        data = request.POST.copy()
        data["specifications"] = json.loads(request.data["specification"])
        data["category"] = json.loads(request.data["category"])
        data["event"] = json.loads(request.data["event"])
        image = request.FILES.pop('image')
        images = []
        category = []
        event = []
        for field, value in request.FILES.items():
            if 'image' in field:
                images.append({"image": request.FILES[field]})
        for item in data['category']:
            item = Category.objects.get(category=item)
            category.append({"category": item.id})
        for item in data['event']:
            item = Event.objects.get(event=item)
            event.append({"event": item.id})
        video = request.FILES.pop('video', None)
        data = json.dumps(data)
        data = json.loads(data)
        if len(images) > 0:
            data['images'] = images
        if len(category) > 0:
            data['category'] = category
        if len(event) > 0:      
            data['event'] = event
        # if data['image1'] == 'null':
        #     data.pop('image1')
        # category = data.pop("category")
        # event = data.pop("event")
        # specification = data.pop("specification")
        if video != None:
            data['video'] = video[0] 
        else:
            data.pop('video')
        data['image'] = image[0]
        # data['status'] = "Active"
        # print(data)
        data['price'] = float(data['sell_price']) + (float(data['sell_price']) * 0.1)
        data['vendor'] = Vendor.objects.get(user = request.user).id
        serializer = ProductSerializer(data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@permission_classes([IsAuthenticated, isVendor])
@api_view(['POST'])
def update_product(request):
    if request.method == "POST":
        data = request.POST.copy()
        product = Product.objects.get(id=data['id'])
        product.images.all().delete()
        product.specifications.all().delete()
        product.category.all().delete()
        product.event.all().delete()
        data["specifications"] = json.loads(request.data["specification"])
        data["category"] = json.loads(request.data["category"])
        data["event"] = json.loads(request.data["event"])
        print(request.FILES)
        image = request.FILES.pop('image', None)
        images = []
        category = []
        event = []
        for field, value in request.FILES.items():
            if 'image' in field:
                images.append({"image": request.FILES[field]})
        for item in data['category']:
            category.append({"category": item})
        for item in data['event']:
            event.append({"event": item})
        video = request.FILES.pop('video', None)
        data = json.dumps(data)
        data = json.loads(data)
        if len(images) > 0:
            data['images'] = images
        if len(category) > 0:
            data['category'] = category
        if len(event) > 0:      
            data['event'] = event
        # if data['image1'] == 'null':
        #     data.pop('image1')
        # category = data.pop("category")
        # event = data.pop("event")
        # specification = data.pop("specification")
        if video != None:
            data['video'] = video[0] 
        else:
            data.pop('video')
        if image != None:
            data['image'] = image[0]
        else:
            data.pop('image')
        # data['status'] = "Active"
        # print(data)
        data['vendor'] = Vendor.objects.get(user = request.user).id
        serializer = ProductSerializer(product, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated, isVendor])
@api_view(['GET'])
def toggleProductStatus(request):
    if request.method == "GET":
        product = Product.objects.get(id=request.GET.get('id'))
        if product.status == 'Active':
            product.status = 'Inactive'
        elif product.status == 'Inactive':
            product.status = 'Active'
        product.save()
        serializer = ProductSerializer(product)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([isVendor])
def orders(request):
    if request.method == "GET":
        vendor = Vendor.objects.get(user=request.user)
        vendor_products = vendor.product_set.all()
        order_items = OrderItem.objects.filter(product__in=vendor_products).filter(status="Pending")

        orders = Order.objects.filter(items__in=order_items).distinct()
        paid_orders = orders.filter(payment__is_paid=True)
        serializer = OrderSerializer(paid_orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([isVendor])
def order_content(request):
    if request.method == "GET":
        vendor = Vendor.objects.get(user=request.user)
        items = OrderItem.objects.filter(order=request.GET.get('id')).filter(product__vendor_id = vendor.id)
        serializer = OrderItemProductSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([isVendor])
def order_item_status_change(request):
    if request.method == "GET":
        vendor = Vendor.objects.get(user=request.user)
        item = OrderItem.objects.get(id=request.GET.get('id'))
        if item.product.vendor == vendor:
            item.status = request.GET.get('status')
            item.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_400_BAD_REQUEST)
    

