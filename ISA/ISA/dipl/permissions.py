from rest_framework import permissions

class HasPermission(permissions.BasePermission):

    def has_object_permission(self,request,view,obj):
        print("HasPermission")
        return True
