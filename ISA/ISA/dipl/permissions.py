from rest_framework import permissions
from .models import User

class HasPermission(permissions.BasePermission):
    print("HasPermission1")
    def has_object_permission(self,request,view,obj):
        print("HasPermission2")
        return False

class HasNoPermission(permissions.BasePermission):
    print("HasNoPermission1")
    def has_permission(self, request):
        print("HasNoPermission2")
        return False

class AddBetPermission(permissions.BasePermission):
    print("AddBetPermission1")
    def has_permission(self, request):
        print("AddBetPermission2")
        userId = request.data["user"]
        user = User.objects.get(id=userId);
        if userId != None and userId != 1 and user.is_active == True:
            return True
        return False


class AdminViewSetPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == "POST":
            if len(request.query_params) > 0:
                userId = request.query_params["userId"]
                user = User.objects.get(id=userId)
                if user.id == 1:
                    return True
                else:
                    return False
        else:
            return True


class MakeUserActivePermission(permissions.BasePermission):
    def has_permission(self, request):
        adminId = request.query_params["adminId"]
        admin = User.objects.get(id=adminId);
        if admin.id == 1:
            return True
        return False


class AddResultsPermission(permissions.BasePermission):
    def has_permission(self, request):
        adminId = request.data["adminId"]
        admin = User.objects.get(id=adminId);
        if admin.id == 1:
            return True
        return False
