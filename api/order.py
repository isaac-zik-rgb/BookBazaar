from flask import Flask, jsonify, request

app = Flask(__name__)

orders = []
 
@app.route('/orders', methods=['GET'])
def get_orders():
    return jsonify(orders)

@app.route('/orders', methods=['POST'])
def create_order():
    new_order = request.get_json()
    orders.append(new_order)
    return jsonify(new_order), 201

@app.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    for order in orders:
        if order['id'] == order_id:
            return jsonify(order)
    return jsonify({'error': 'Order not found'}), 404

@app.route('/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    for order in orders:
        if order['id'] == order_id:
            updated_order = request.get_json()
            order.update(updated_order)
            return jsonify(order)
    return jsonify({'error': 'Order not found'}), 404

@app.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    for order in orders:
        if order['id'] == order_id:
            orders.remove(order)
            return jsonify({'message': 'Order deleted'})
    return jsonify({'error': 'Order not found'}), 404

if __name__ == '__main__':
    app.run()
    import os

    if __name__ == '__main__':
        port = int(os.environ.get('PORT', 5000))
        app.run(host='0.0.0.0', port=port)