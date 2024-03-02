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
