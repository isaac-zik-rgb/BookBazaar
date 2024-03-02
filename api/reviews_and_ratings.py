from flask import Flask, request, jsonify

app = Flask(__name__)

books = []

@app.route('/books', methods=['GET'])
def get_books():
    return jsonify(books)

@app.route('/books', methods=['POST'])
def add_book():
    data = request.get_json()
    books.append(data)
    return jsonify({'message': 'Book added successfully!'})

@app.route('/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    data = request.get_json()
    for book in books:
        if book['id'] == book_id:
            book['title'] = data['title']
            book['author'] = data['author']
            book['score'] = data['score']
            return jsonify({'message': 'Book updated successfully!'})
    return jsonify({'message': 'Book not found!'})

@app.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    for book in books:
        if book['id'] == book_id:
            books.remove(book)
            return jsonify({'message': 'Book deleted successfully!'})
    return jsonify({'message': 'Book not found!'})

if __name__ == '__main__':
    app.run()