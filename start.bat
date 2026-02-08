@echo off
echo ========================================
echo Interactive Matrix Analysis Application
echo ========================================
echo.
echo Starting servers...
echo.

start "Backend Server" cmd /k "cd backend && npm run dev"
timeout /t 2 /nobreak > nul
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Both servers starting...
echo ========================================
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window (servers will keep running)
pause
