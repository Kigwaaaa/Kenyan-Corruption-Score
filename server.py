import http.server
import socketserver
import json
import os
from urllib.parse import urlparse, parse_qs

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        self.send_header('Access-Control-Max-Age', '3600')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        print(f"\nReceived request for: {path}")

        try:
            # Get the current working directory
            cwd = os.getcwd()
            print(f"Current working directory: {cwd}")

            # Define possible base paths for JSON files
            possible_paths = [
                os.path.join(cwd, 'kenya-finance-watch', 'public'),
                os.path.join(cwd, 'public'),
                os.path.join(cwd, 'kenya-finance-watch', 'src', 'public')
            ]

            # Try to find the correct base path
            base_path = None
            for path_option in possible_paths:
                print(f"Checking path: {path_option}")
                if os.path.exists(path_option):
                    base_path = path_option
                    print(f"Found valid base path: {base_path}")
                    break

            if not base_path:
                print("No valid base path found")
                self.send_error(500, "Could not find public directory")
                return

            # Handle static files
            if path.endswith(('.js', '.css', '.svg', '.ico')):
                file_path = os.path.join(base_path, path.lstrip('/'))
                print(f"Attempting to read static file: {file_path}")
                if not os.path.exists(file_path):
                    print(f"Static file not found: {file_path}")
                    self.send_error(404, "File not found")
                    return
                with open(file_path, 'rb') as f:
                    self.send_response(200)
                    if path.endswith('.js'):
                        self.send_header('Content-type', 'application/javascript')
                    elif path.endswith('.css'):
                        self.send_header('Content-type', 'text/css')
                    elif path.endswith('.svg'):
                        self.send_header('Content-type', 'image/svg+xml')
                    elif path.endswith('.ico'):
                        self.send_header('Content-type', 'image/x-icon')
                    self.end_headers()
                    self.wfile.write(f.read())
                return

            # Handle JSON files
            json_files = {
                '/data.json': 'data.json',
                '/irregularities.json': 'irregularities.json',
                '/leadership.json': 'leadership.json'
            }

            if path in json_files:
                file_path = os.path.join(base_path, json_files[path])
                print(f"Attempting to read JSON file: {file_path}")
                if not os.path.exists(file_path):
                    print(f"JSON file not found: {file_path}")
                    self.send_error(404, "File not found")
                    return
                try:
                    with open(file_path, 'r') as f:
                        data = json.load(f)
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps(data).encode())
                    return
                except Exception as e:
                    print(f"Error reading {json_files[path]}: {str(e)}")
                    self.send_error(500, f"Error reading file: {str(e)}")
                    return

            elif path.startswith('/api/ministries'):
                file_path = os.path.join(base_path, 'data.json')
                print(f"Attempting to read: {file_path}")
                if not os.path.exists(file_path):
                    print(f"File not found: {file_path}")
                    self.send_error(404, "File not found")
                    return
                with open(file_path, 'r') as f:
                    data = json.load(f)
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(data['ministries']).encode())
                return

            # Handle index.html
            if path == '/' or path == '/index.html':
                file_path = os.path.join(base_path, 'index.html')
                print(f"Attempting to read: {file_path}")
                if not os.path.exists(file_path):
                    print(f"File not found: {file_path}")
                    self.send_error(404, "File not found")
                    return
                with open(file_path, 'rb') as f:
                    self.send_response(200)
                    self.send_header('Content-type', 'text/html')
                    self.end_headers()
                    self.wfile.write(f.read())
                return

            return super().do_GET()
        except Exception as e:
            print(f"Error handling request: {str(e)}")
            self.send_error(500, str(e))
            return

def run(port=8000):
    with socketserver.TCPServer(("", port), CORSRequestHandler) as httpd:
        print(f"Starting server on port {port}...")
        print(f"Current working directory: {os.getcwd()}")
        print("Checking possible base paths:")
        possible_paths = [
            os.path.join(os.getcwd(), 'kenya-finance-watch', 'public'),
            os.path.join(os.getcwd(), 'public'),
            os.path.join(os.getcwd(), 'kenya-finance-watch', 'src', 'public')
        ]
        for path in possible_paths:
            print(f"  - {path}: {'exists' if os.path.exists(path) else 'not found'}")
        httpd.serve_forever()

if __name__ == "__main__":
    run() 