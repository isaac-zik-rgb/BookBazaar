
from django.urls import path, include
from .views import RegisterUserAPIView, LogoutView, UserProfileDetail, UserProfileEdit, UserList, UserDetail
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from .views import BookViewSet, BookInteractionViewSet

from rest_framework.routers import DefaultRouter
from .views import BookViewSet, AllBooksViewSet, CartViewSet, CartItemViewSet, OrderViewSet, OrderItemViewSet

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
# =========================================================================================================================================================================================================
  path('profile/<int:pk>/', UserDetail.as_view(), name='user-detail'),
  path("profile", UserProfileDetail.as_view(), name="profile"),
  path('auth/register',RegisterUserAPIView.as_view(), name='register'),
  path('logout',LogoutView.as_view(), name='logout'),
  path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
  path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
  path('profile/edit', UserProfileEdit.as_view(), name='profile-edit'), 
  path('profiles', UserList.as_view(), name='user'),

#===========================================================================================================================================================================================================
  # Api endpoint for likes

  path('books/<int:book_id>/like/', BookInteractionViewSet.as_view({'post': 'create_like', 'get': 'list_likes'}), name='like'),
  path('books/<int:book_id>/like/<int:like_id>/', BookInteractionViewSet.as_view({'delete': 'delete_like', 'get': 'retrieve_like'}), name='like'),
  
  #========================================================================================================================================================================================================
  # api endpoint for all followers
  path('authors/<int:author_id>/follow/', BookInteractionViewSet.as_view({'post': 'follow_author'}), name='follow_author'),
  path('authors/<int:author_id>/followers/', BookInteractionViewSet.as_view({'get': 'list_followers'}), name='list_followers'),
  path('authors/<int:author_id>/unfollow/', BookInteractionViewSet.as_view({'delete': 'delete_follow'}), name='delete_follow'),
  path('books/<int:book_id>/like/', BookInteractionViewSet.as_view({'get': 'list_likes'}), name='list_likes'),
  
  #========================================================================================================================================================================================================
  # api endpoint for all comments

  path('books/comment/', BookInteractionViewSet.as_view({'post': 'create_comment'}), name='comment'),
  path('books/<int:book_id>/comments/', BookInteractionViewSet.as_view({'get': 'list_comments'}), name='list_comments'),
  path('books/<int:book_id>/comments/<int:comment_id>/', BookInteractionViewSet.as_view({'delete': 'delete_comment'}), name='delete_comment'),
  path('books/<int:book_id>/comments/<int:comment_id>', BookInteractionViewSet.as_view({'put': 'update_comment'}), name='update_comment'),

# ======================================================================================================================================================================================================
  # api endpoint for reviews
  path('books/reviews/', BookInteractionViewSet.as_view({'post': 'create_review'}), name='review'),
  path('books/<int:book_id>/reviews/<int:review_id>/', BookInteractionViewSet.as_view({'delete': "delete_review", 'put': "update_review", "get": "retrieve_review"}), name='review-detail'),
  
  # list all reviews for a book
  path('books/<int:book_id>/reviews/', BookInteractionViewSet.as_view({'get': 'list_reviews'}), name='list_reviews'),
  #===================================================================================================================================================================================================


  # for Cart
  path('cart/', CartViewSet.as_view({'get': 'list', 'post': 'create'}), name='cart'),
  path('cart/<int:pk>/', CartViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='cart-detail'),
  path('cart/<int:book_id>/add/', CartItemViewSet.as_view({'post': 'create'}), name='add-to-cart'),
  path('cart/<int:cart_id>/remove/', CartItemViewSet.as_view({'delete': 'destroy'}), name='remove-from-cart'),
  path('cart/<int:cart_id>/items/', CartItemViewSet.as_view({'get': 'list'}), name='cart-items'),
  
#URL for order
  path('order/', OrderViewSet.as_view({'get': 'list', 'post': 'create'}), name='order'),
  path('order/<int:pk>/', OrderViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='order-detail'),
  path('order/<int:order_id>/add/', OrderItemViewSet.as_view({'post': 'create'}), name='add-to-order'),
  path('order/<int:order_id>/remove/', OrderItemViewSet.as_view({'delete': 'destroy'}), name='remove-from-order'),
  path('order/<int:order_id>/items/', OrderItemViewSet.as_view({'get': 'list'}), name='order-items'),


  path('', include(router.urls)),
]
