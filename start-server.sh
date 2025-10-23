#!/bin/bash
# Simple HTTP server to avoid CORS issues
# Run this script and open http://localhost:8000 in your browser

echo "Starting local server to avoid CORS issues..."
echo "Server will run at http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
else
    echo "Python not found. Please install Python to run a local server."
    echo "Alternatively, you can use any other local server like Live Server in VS Code."
    exit 1
fi
