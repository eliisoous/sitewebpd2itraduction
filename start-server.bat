@echo off
REM Simple HTTP server to avoid CORS issues
REM Run this script and open http://localhost:8000 in your browser

echo Starting local server to avoid CORS issues...
echo Server will run at http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% equ 0 (
    python -m http.server 8000
) else (
    echo Python not found. Please install Python to run a local server.
    echo Alternatively, you can use any other local server like Live Server in VS Code.
    pause
    exit /b 1
)
