@echo off
:: ─────────────────────────────────────────────────────────────────────────────
:: Portfolio AI Sync — runs every 6h via Windows Task Scheduler
:: Calls the Next.js /api/sync/run endpoint to update GitHub + Todo embeddings
::
:: SETUP (one-time):
::   1. Edit SYNC_SECRET below to match your .env.local SYNC_SECRET value
::   2. Edit SYNC_TARGET_URL if deploying to Vercel (leave localhost for local)
::   3. Double-click "register-task.bat" to register the scheduled task
:: ─────────────────────────────────────────────────────────────────────────────

:: ── Configuration ─────────────────────────────────────────────────────────────
set SYNC_SECRET=amarjit-sync-secret-2024
set SYNC_TARGET_URL=http://localhost:3000

:: ── Path to this project ──────────────────────────────────────────────────────
set SCRIPT_DIR=%~dp0
set PROJECT_DIR=%SCRIPT_DIR%..

:: ── Run the sync ──────────────────────────────────────────────────────────────
echo [%DATE% %TIME%] Starting portfolio AI sync...
cd /d "%PROJECT_DIR%"
set SYNC_SECRET=%SYNC_SECRET%
set SYNC_TARGET_URL=%SYNC_TARGET_URL%
node scripts\sync.js >> "%SCRIPT_DIR%sync.log" 2>&1

if %ERRORLEVEL% EQU 0 (
    echo [%DATE% %TIME%] Sync completed successfully.
) else (
    echo [%DATE% %TIME%] Sync failed. Check scripts\sync.log for details.
)
