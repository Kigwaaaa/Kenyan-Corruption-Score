from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os
import logging

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('server.log'),
        logging.StreamHandler()
    ]
)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/api/ministries')
def get_ministries():
    try:
        with open('data.json', 'r') as f:
            data = f.read()
        return data, 200, {'Content-Type': 'application/json'}
    except Exception as e:
        logging.error(f"Error reading data.json: {str(e)}")
        return jsonify({"error": "Failed to read data"}), 500

@app.route('/data.json')
def get_data():
    try:
        with open('data.json', 'r') as f:
            data = f.read()
        return data, 200, {'Content-Type': 'application/json'}
    except Exception as e:
        logging.error(f"Error reading data.json: {str(e)}")
        return jsonify({"error": "Failed to read data"}), 500

@app.route('/')
def serve_index():
    # Try to serve from dist folder first (for production build)
    if os.path.exists('dist/index.html'):
        return send_from_directory('dist', 'index.html')
    # Fallback to root directory (for development)
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    # Try to serve from dist folder first (for production build)
    if os.path.exists(f'dist/{path}'):
        return send_from_directory('dist', path)
    # Fallback to root directory (for development)
    return send_from_directory('.', path)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    logging.info(f"Starting Flask server on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=False) 