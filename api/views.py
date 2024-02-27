from django.shortcuts import render

from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer,RegisterSerializer, UserProfileSerializer, UserSerializer, BookSerializer, FollowSerializer, ReviewSerializer
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated 
from rest_framework import generics, status
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import UserProfile, Book, Follow, Review, Comment, Like
from .permissions import IsUserProfileOwnerOrReadOnly, IsOwnerOrReadOnly, IsCommentOwnerOrBookOwner
from rest_framework import viewsets, permissions
from .serializers import CommentSerializer, LikeSerializer
from rest_framework import status
from django.core.paginator import Paginator





class UserList(generics.ListAPIView):
    """
    Retrieve a list of all users.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a user instance.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

   
# Class based view to Get User Details using Token Authentication
class UserProfileDetail(generics.RetrieveAPIView):
    """
    Retrieve the user profile of the currently logged-in user.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Retrieve the profile associated with the currently authenticated user
        return self.request.user.profile

class UserProfileEdit(generics.RetrieveUpdateDestroyAPIView):
    """
    Update the user profile of the currently logged-in user.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated, IsUserProfileOwnerOrReadOnly]

    def get_object(self):
        # Retrieve the profile associated with the currently authenticated user
        return self.request.user.profile
    

   


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


# ViewSets define the view behavior.
class BookViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows books to be viewed or edited.
    """
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can access

    def get_queryset(self):
        # Filter queryset to only include books owned by the current user
        return Book.objects.filter(owner=self.request.user.profile)

    def perform_create(self, serializer):
        # Set the owner of the book to the current user
        serializer.save(owner=self.request.user.profile)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": f"Book '{instance.title}' has been deleted."}, status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()



class AllBooksViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows all books to be viewed.
    """
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]  # Allow anyone to view all book

class BookInteractionViewSet(viewsets.ViewSet):
    """
    API endpoint that allows interactions with books (e.g., liking, commenting, reviewing).
    """
    permission_classes = [IsAuthenticatedOrReadOnly]


    def create_like(self, request):
        book_id = request.data.get('book_id')
        try:
            book = Book.objects.get(id=book_id)
            like, created = Like.objects.get_or_create(user=request.user, book=book)
            if created:
                return Response({'message': 'Book liked successfully.'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'You have already liked this book.'}, status=status.HTTP_400_BAD_REQUEST)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found.'}, status=status.HTTP_404_NOT_FOUND)

    def create_interaction(self, request, serializer_class):
        serializer = serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def follow_author(self, request):
        return self.create_interaction(request, FollowSerializer)

    def create_comment(self, request):
        serializer = CommentSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(commenter=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def create_review(self, request):
        serializer = ReviewSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(reviewer=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def list_followers(self, request, author_id):
        followers = Follow.objects.filter(author_id=author_id)
        paginator = Paginator(followers, 10)  # Adjust the page size as needed
        page_number = request.query_params.get('page', 1)
        page = paginator.get_page(page_number)
        serializer = FollowSerializer(page, many=True)
        return Response(serializer.data)

    def delete_follow(self, request, author_id):
        try:
            follow = Follow.objects.get(user=request.user, author_id=author_id)
            follow.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Follow.DoesNotExist:
            return Response({'error': 'Follow not found.'}, status=status.HTTP_404_NOT_FOUND)
        
    def list_comments(self, request, book_id):
        # Retrieve the book owned by the authenticated user
        try:
            book_id = Book.objects.get(id=book_id)
            comments = Comment.objects.filter(book_id=book_id)
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found or you are not the owner.'}, status=status.HTTP_404_NOT_FOUND)

    def list_reviews(self, request, book_id):
        try:
            book = Book.objects.get(id=book_id)
            reviews = Review.objects.filter(book=book)
            serializer = ReviewSerializer(reviews, many=True, context={'request': request})
            return Response(serializer.data)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found or you are not the owner.'}, status=status.HTTP_404_NOT_FOUND)

    def list_likes(self, request, book_id):
        try:
            book = Book.objects.get(id=book_id, owner=request.user.profile)
            likes = Like.objects.filter(book=book)
            serializer = LikeSerializer(likes, many=True)
            return Response(serializer.data)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found or you are not the owner.'}, status=status.HTTP_404_NOT_FOUND)
    
   

# Class to handle deletes
class DeleteCommentReviewsOrLike(generics.DestroyAPIView):
      """
    API endpoint that allows comments to be deleted.
    """
      queryset = Comment.objects.all()
      serializer_class = CommentSerializer
      authentication_classes = [TokenAuthentication]
      permission_classes = [IsAuthenticated, IsCommentOwnerOrBookOwner]

      def get_object(self):
        # Get the comment_id from the URL
        comment_id = self.kwargs.get('comment_id')
        # Get the comment object
        return Comment.objects.get(id=comment_id)

      def delete(self, request, book_id, comment_id):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response({"message": f"Comment with the id: {comment_id} has been deleted"}, status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            return Response({'error': 'Comment not found.'}, status=status.HTTP_404_NOT_FOUND)

      def delete_like(self, request, book_id, like_id):
        try:
            like = Like.objects.get(id=like_id, book_id=book_id, user=request.user)
            like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Like.DoesNotExist:
            return Response({'error': 'Like not found.'}, status=status.HTTP_404_NOT_FOUND)
    
      def delete_review(self, request, book_id, review_id):
        try:
            review = Review.objects.get(id=review_id, book_id=book_id, reviewer=request.profile)
            review.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Review.DoesNotExist:
            return Response({'error': 'Review not found.'}, status=status.HTTP_404_NOT_FOUND)