@echo off
:: ─────────────────────────────────────────────────────────────────────────────
:: Registers the portfolio AI sync as a Windows Scheduled Task
:: Runs every 6 hours, silently in the background
:: Run this file ONCE as Administrator
:: ─────────────────────────────────────────────────────────────────────────────

set TASK_NAME=PortfolioAISync
set SCRIPT_DIR=%~dp0
set SYNC_BAT=%SCRIPT_DIR%sync.bat

echo [setup] Registering scheduled task: %TASK_NAME%
echo [setup] Script: %SYNC_BAT%
echo.

:: Delete existing task if present
schtasks /delete /tn "%TASK_NAME%" /f >nul 2>&1

:: Create new task — runs every 6 hours, starts at next occurrence
schtasks /create ^
  /tn "%TASK_NAME%" ^
  /tr "\"%SYNC_BAT%\"" ^
  /sc hourly ^
  /mo 6 ^
  /st 08:00 ^
  /ru "%USERNAME%" ^
  /rl HIGHEST ^
  /f

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [setup] ✓ Scheduled task registered successfully!
    echo [setup]   Task name : %TASK_NAME%
    echo [setup]   Runs every: 6 hours starting 08:00
    echo [setup]   Log file  : %SCRIPT_DIR%sync.log
    echo.
    echo [setup] To run immediately: schtasks /run /tn "%TASK_NAME%"
    echo [setup] To remove task    : schtasks /delete /tn "%TASK_NAME%" /f
) else (
    echo.
    echo [setup] ✗ Failed to register task. Make sure you ran this as Administrator.
)
pause
