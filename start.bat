@echo off
title The Neotia University - Module III Performance Management Automation System
echo ===============================================================================
echo   THE NEOTIA UNIVERSITY (TNU) - MODULE III STANDALONE AUTOMATION SYSTEM
echo   Performance Management Automation System (Complete Workflow)
echo ===============================================================================
echo.
echo Starting Node.js backend server and serving client...
start "" http://localhost:5000
node server/index.js
pause
