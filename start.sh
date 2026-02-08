#!/bin/bash
echo "========================================"
echo "Interactive Matrix Analysis Application"
echo "========================================"
echo ""
echo "Starting servers..."
echo ""

# Start backend in background
echo "Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend in background
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

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
