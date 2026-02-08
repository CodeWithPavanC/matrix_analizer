#!/bin/bash
echo "========================================"
echo "Interactive Matrix Analysis Application"
echo "========================================"
echo ""
echo "Starting servers..."
echo ""

# Start backend 
echo "Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!

sleep 2

# Start frontend 
echo "Starting Frontend Server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

cd ..
echo ""
echo "========================================"
echo "Both servers starting..."
echo "========================================"
echo ""
echo "Backend: http://localhost:3001"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""


wait $BACKEND_PID $FRONTEND_PID
