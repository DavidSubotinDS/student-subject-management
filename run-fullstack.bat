@echo off
title Pokretanje Fullstack Aplikacije
setlocal

REM === Proveri da li je MySQL servis aktivan ===
echo.
echo [MySQL] Proveravam da li je MySQL servis aktivan...

sc query "MySQL80" | find "RUNNING" >nul
IF ERRORLEVEL 1 (
    echo [MySQL] Servis nije pokrenut.
    set /p STARTMYSQL="Želiš li da ga pokreneš sada? (y/n): "
    if /i "%STARTMYSQL%"=="y" (
        net start MySQL80
        if ERRORLEVEL 1 (
            echo [GREŠKA] Nije moguće pokrenuti MySQL servis. Pokreni ga ručno i pokušaj ponovo.
            pause
            exit /b
        )
    ) else (
        echo [INFO] Nastavljam bez pokretanja MySQL-a.
    )
) else (
    echo [MySQL] Servis je već aktivan.
)

REM === Pokretanje backend-a ===
echo [BACKEND] Buildujem backend...
cd /d %~dp0studentska-evidencija-backend
call mvnw clean install -DskipTests >nul 2>&1

IF ERRORLEVEL 1 (
    echo [GREŠKA] Backend build nije uspeo. Proveri kod!
    pause
    exit /b
)

echo [BACKEND] Pokrećem backend server...
start "" cmd /k "cd /d %~dp0studentska-evidencija-backend && mvnw spring-boot:run"

REM === Pokretanje frontend-a ===
cd /d %~dp0studentska-evidencija-frontend

IF NOT EXIST node_modules (
    echo [FRONTEND] Instaliram dependencije...
    call npm install
)

echo [FRONTEND] Pokrećem React app...
start "" cmd /k "cd /d %~dp0studentska-evidencija-frontend && powershell -Command \"Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass\" && npm start"

exit
