# BookBazaar
# BookBazaar is a web application that allows users to buy and sell books. Users can also connect with other users to discuss books and share their thoughts.
# BookBazaar was created by a team of 4 students as there final project for the Alx Software Engineering program.
# The team members are:
# - [Isaac okechukwu] - Backend Developer (https:github.com/isaac-okechukwu)
# - Guys attach your names and github links here

# Features
# - Users can create an account and log in
# - Users can post books for sale
# - Users can search for books
# - Users can view books
# - Users can add books to their cart
# - Users can purchase books
# - Users can view their profile
# - Users can connect with other users
# - Users can view other users profiles
# - Users can chat with other users
# - Users can view other users books
# - Users can view other users reviews
# - Users can view other users ratings
# - Users can view other users location
# - Users can view other users contact information
# - users can comment on books, like and follow other users

# Tech
# - Python (Django)
# - HTML
# - CSS
# - JavaScript
# - React
# - Redux
# - SQLite

# Installation
# - Create a virtual environment
# - Clone the repository
* git clone <project url>
# - Navigate to the project directory
* cd <project directory>
# - Install the required packages
* pip install -r requirements.txt
# - Run the application
* python manage.py runserver


# AVAILABLE ENDPOINTS FOR CONSUMING THE API
# Authentication
# - /api/v1/auth/register [POST]
# - /api/v1/auth/login [POST] (Returns a token)
# - /api/v1/auth/logout [POST] (Protected) (Requires authentication)

# Profile
# - /api/v1/profile/<int:pk> [GET]
# - /api/v1/profiles [GET]
# - /api/v1/profile [POST] (Protected) (Requires authentication)
# - /api/v1/profile/edit/ [PUT] (Protected) (Requires authentication)
# - /api/v1/profile/delete/ [DELETE] (Protected) (Requires authentication)

# Books
# - /api/v1/all-books/ [GET] (list all books in the database)

# - /api/v1/all-books/<int:pk> [GET] (get a single book)

# - /api/v1/books/<int:pk> [GET] (get a single book that belongs to the login in user) (Protected) (Requires authentication)

# - /api/v1/books/ [GET] (Protected) (Requires authentication) (list all books that belongs to the login in user)

# - /api/v1/books/ [POST] (Protected) (Requires authentication)

# - /api/v1/books/edit/ [PUT] (Protected) (Requires authentication)
# - /api/v1/books/<int:pk> [DELETE] (Protected) (Requires authentication)


# Reviews
# - /api/v1/books/review/ [POST] (Protected) (Requires authentication)
# - /api/v1/books/<int:book_id>/reviews/ [PUT] (Protected) (Requires authentication)
# - api/v1/books/<int:book_id>/reviews/ [GET] list all books for book id
# - api/v1/books/<int:book_id>/reviews/<int:review_id>/ [DELETE] (prctected) (Require authentication) delete a review

# Comments
# - api/v1/books/comment/ [POST] (Protected) (Require authentication) post comment for a book
# - api/v1/books/<int:book_id>/comments/ [GET] list all coments for a particular book
# - api/v1/books/<int:book_id>/comments/<int:comment_id>/ [DELETE] (proctected) (Require authentication) delete a comment for a book
# - api/v1/books/<int:book_id>/comments/<int:comment_id> [PUT] (proctected) (require authentication) update a comment for a book

# Followers endpoint
# - api/v1/authors/<int:author_id>/follow/ [POST] (protected) (Require authentication) follow an author
# - api/v1/authors/<int:author_id>/followers/ [GET] list followers for a particular author
# - api/v1/authors/<int:author_id>/unfollow/ [DELETE] (protected) (Require authentication) unfollow a user

# Likes
# - api/v1/books/<int:book_id>/like/ [POST] [GET] (protected) (Require authentication) post a like for a book
# - api/v1/books/<int:book_id>/like/<int:like_id>/ [DELETE] [GET] (protected) (Require Authentication) unlike a book and also get a like for a particular id


# Cart
