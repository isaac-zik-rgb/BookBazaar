
from django.urls import path, include
from .views import RegisterUserAPIView, LogoutView, UserProfileDetail, UserProfileEdit, UserList, UserDetail
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from django.conf import settings
from .views import BookViewSet, BookInteractionViewSet

from rest_framework.routers import DefaultRouter
from .views import BookViewSet, AllBooksViewSet, DeleteCommentReviewsOrLike

router = DefaultRouter()
router.register(r'books', BookViewSet, basename='book')
router.register(r'all-books', AllBooksViewSet, basename='all-books')


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

  path('books/like/', BookInteractionViewSet.as_view({'post': 'create_like'}), name='like'),
  
  path('books/review/', BookInteractionViewSet.as_view({'post': 'create_review'}), name='review'),
  path('authors/<int:author_id>/follow/', BookInteractionViewSet.as_view({'post': 'follow_author'}), name='follow_author'),
  path('authors/<int:author_id>/followers/', BookInteractionViewSet.as_view({'get': 'list_followers'}), name='list_followers'),
  path('authors/<int:author_id>/unfollow/', BookInteractionViewSet.as_view({'delete': 'delete_follow'}), name='delete_follow'),
  path('books/<int:book_id>/like/', BookInteractionViewSet.as_view({'get': 'list_likes'}), name='list_likes'),
  path('books/<int:book_id>/review/', BookInteractionViewSet.as_view({'get': 'list_reviews'}), name='list_reviews'),

  # for book comments
  path('books/comment/', BookInteractionViewSet.as_view({'post': 'create_comment'}), name='comment'),
  path('books/<int:book_id>/comments/', BookInteractionViewSet.as_view({'get': 'list_comments'}), name='list_comments'),
  path('books/<int:book_id>/comments/<int:comment_id>/', DeleteCommentReviewsOrLike.as_view(), name='delete_comment'),

  path('', include(router.urls)),
]
