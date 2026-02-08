#!/bin/bash
echo "========================================"
echo "Interactive Matrix Analysis Application"
echo "One-Click Setup Script"
echo "========================================"
echo ""
echo "This script will install all required dependencies for:"
echo "- Backend (Node.js + Express + TypeScript)"
echo "- Frontend (React + TypeScript + Tailwind CSS)"
echo ""
echo "Please ensure you have Node.js installed (v18 or higher)"
echo ""
read -p "Press Enter to continue..."

echo ""
echo "[1/2] Installing Backend Dependencies..."
echo "========================================"
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Backend dependency installation failed!"
    read -p "Press Enter to exit..."
    exit 1
fi
echo "Backend dependencies installed successfully!"

echo ""
echo "[2/2] Installing Frontend Dependencies..."
echo "========================================"
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Frontend dependency installation failed!"
    read -p "Press Enter to exit..."
    exit 1
fi
echo "Frontend dependencies installed successfully!"

cd ..
echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "All dependencies have been installed successfully."
echo ""
echo "To start the application, run: ./start.sh"
echo ""
read -p "Press Enter to exit..."
