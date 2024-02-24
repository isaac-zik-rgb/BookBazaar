from rest_framework import permissions


class IsUserProfileOwnerOrReadOnly(permissions.BasePermission):
    '''
    Custom permissions for UserViewset to only allow user to edith their own profile. Otherwise, Get and Post only
    '''
    def has_permission(self, request, view):
        return True
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if not request.user.is_anonymous:
            return request.user.profile == obj
        return False
    


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom Permissions to allow owner of an object to edit
    """
     
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permission is only allowed to the owner of an object
        return obj.owner == request.user
    