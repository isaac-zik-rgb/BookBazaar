from django.shortcuts import render

from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer,RegisterSerializer, UserProfileSerializer
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, authentication_classes, permission_classes


# Class based view to Get User Details using Token Authentication
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@swagger_auto_schema(
    responses={200: UserSerializer},
    operation_description=" Retrieve the profile of the currently logged-in user."
)
def profile_details(request):
    """
     Retrieve the profile of the currently logged-in user.
    """
    user = request.user
    user_profile = user.profile
    serializer = UserProfileSerializer(user_profile, many=False, context={'request': request})  # Pass request to context
    return Response(serializer.data)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@swagger_auto_schema(
    responses={200: UserSerializer},
    operation_description=" Update the profile of the currently logged-in user."
)
def update_profile(request):
    """
     Update the profile of the currently logged-in user.
    """
    user = request.user
    serializer = UserProfileSerializer(user.profile, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Class based view to register user
class RegisterUserAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    @swagger_auto_schema(operation_description="Register a new user")
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

# Logout view
class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(operation_description="Logout and invalidate the user's token")
    def post(self, request):
        """
        Logout and invalidate the user's token.
        """
        request.user.auth_token.delete()
        return Response({"message": "Successfully logged out."})