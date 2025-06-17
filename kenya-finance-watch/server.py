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
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    logging.info("Starting Flask server on port 8000...")
    app.run(host='0.0.0.0', port=8000, debug=True) 