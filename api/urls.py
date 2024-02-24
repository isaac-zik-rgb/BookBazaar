from django.urls import path
from .views import RegisterUserAPIView, LogoutView, UserProfileDetail, UserProfileEdit, UserList, UserDetail
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from django.conf import settings

schema_view = get_schema_view(
    openapi.Info(
        title="Your API Title",
        default_version='v1',
        description="Your API description",
        terms_of_service="https://www.example.com/policies/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
urlpatterns = [
  path("profile", UserProfileDetail.as_view(), name="profile"),
  path('register',RegisterUserAPIView.as_view(), name='register'),
  path('logout',LogoutView.as_view(), name='logout'),
  path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
  path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
  path('profile/edit', UserProfileEdit.as_view(), name='profile-edit'), 
  path('profiles', UserList.as_view(), name='user'),
  path('profiles/<int:pk>', UserDetail.as_view(), name='user'),
]