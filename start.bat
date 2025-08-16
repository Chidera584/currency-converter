@echo off
echo 🚀 Starting Currency Converter App...
echo.

echo 📦 Installing dependencies...
call npm run install-all

echo.
echo 🔧 Setting up environment...
if not exist "backend\.env" (
    echo Creating .env file from template...
    copy "backend\env.example" "backend\.env"
    echo Please edit backend\.env with your configuration
    echo.
)

echo.
echo 🌐 Starting backend server...
start "Backend Server" cmd /k "npm run server"

echo.
echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo.
echo 📱 Starting frontend app...
start "Frontend App" cmd /k "npm run client"

echo.
echo ✅ Currency Converter App is starting!
echo.
echo 📍 Backend: http://localhost:5000
echo 📍 Frontend: Expo will open in your browser
echo.
echo Press any key to exit this window...
pause >nul

