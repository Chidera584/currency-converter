@echo off
echo Building Currency Converter Web App...
echo.

echo Step 1: Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Building for production...
npm run build
if %errorlevel% neq 0 (
    echo Error: Failed to build the app
    pause
    exit /b 1
)

echo.
echo ✅ Build completed successfully!
echo.
echo 📁 Build files are in the 'build' folder
echo 🌐 Ready for deployment to Netlify, Vercel, or any static hosting service
echo.
echo 📋 Next steps:
echo 1. Go to netlify.com
echo 2. Drag and drop the 'build' folder
echo 3. Get your live URL instantly!
echo.
pause



