@echo off
echo ========================================
echo Interactive Matrix Analysis Application
echo One-Click Setup Script
echo ========================================
echo.
echo This script will install all required dependencies for:
echo - Backend (Node.js + Express + TypeScript)
echo - Frontend (React + TypeScript + Tailwind CSS)
echo.
echo Please ensure you have Node.js installed (v18 or higher)
echo.
pause

echo.
echo [1/2] Installing Backend Dependencies...
echo ========================================
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend dependency installation failed!
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!

echo.
echo [2/2] Installing Frontend Dependencies...
echo ========================================
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend dependency installation failed!
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully!

cd ..
echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo All dependencies have been installed successfully.
echo.
echo To start the application, run: start.bat
echo.
pause
