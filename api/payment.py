from flask import Flask, request

app = Flask(__name__)

books = {}
next_book_id = 1

@app.route('/books', methods=['GET'])
def get_books():
    return {'books': list(books.values())}

@app.route('/books', methods=['POST'])
def add_book():
    book = request.get_json()
    book_id = next_book_id
    next_book_id += 1
    books[book_id] = book
    return {'message': 'Book added successfully'}

@app.route('/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    book = request.get_json()
    books[book_id] = book
    return {'message': 'Book updated successfully'}

@app.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    del books[book_id]
    return {'message': 'Book deleted successfully'}

@app.route('/books/<int:book_id>/trade', methods=['POST'])
def trade_book(book_id):
    trade_details = request.get_json()
    other_book_id = trade_details.get('other_book_id')

    if other_book_id is None:
        return {'message': 'Other book ID not provided'}, 400

    if book_id not in books:
        return {'message': 'Book not found'}, 404

    if other_book_id not in books:
        return {'message': 'Other book not found'}, 404

    if book_id == other_book_id:
        return {'message': 'Cannot trade a book with itself'}, 400

    book = books[book_id]
    other_book = books[other_book_id]

    books[book_id] = other_book
    books[other_book_id] = book

    return {'message': 'Trade completed successfully'}

if __name__ == '__main__':
    app.run()