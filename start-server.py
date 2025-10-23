#!/usr/bin/env python3
"""
Simple HTTP server to avoid CORS issues when developing locally.
Run this script and open http://localhost:8000 in your browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers to avoid CORS issues
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    # Change to the directory where the script is located
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print(f"Server running at http://localhost:{PORT}/")
            print("Press Ctrl+C to stop the server")
            print("Opening browser...")
            
            # Open browser automatically
            webbrowser.open(f'http://localhost:{PORT}/')
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"Port {PORT} is already in use. Trying port {PORT + 1}...")
            PORT += 1
            main()
        else:
            print(f"Error: {e}")
            sys.exit(1)

if __name__ == "__main__":
    main()
