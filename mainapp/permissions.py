from rest_framework import permissions
from .models import Vendor

class isVendor(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and Vendor.objects.filter(user=request.user).exists())