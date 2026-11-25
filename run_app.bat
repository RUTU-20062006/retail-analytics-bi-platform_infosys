@echo off
echo ========================================================
echo   Starting OmniAnalytics BI Platform
echo   Frontend (React + Vite)  : http://localhost:3000
echo   Backend (Express + PG)   : http://localhost:5000
echo ========================================================

start "OmniAnalytics Backend API" cmd /k "cd server && npm start"
start "OmniAnalytics React Frontend" cmd /k "cd client && npm run dev"

echo.
echo Both servers have been launched!
echo Open your browser at: http://localhost:3000
echo ========================================================
pause
