@echo off
title Pokretanje Fullstack Aplikacije

REM 1. Pokretanje backend dela
echo === Pokretanje backend dela... ===
start cmd /k "cd /d C:\Users\dsubo\Documents\student-subject-management\studentska-evidencija-backend && mvn spring-boot:run"

REM 2. Pokretanje frontend dela
echo === Pokretanje frontend dela... ===
start cmd /k "cd /d C:\Users\dsubo\Documents\student-subject-management\studentska-evidencija-frontend && powershell -Command Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass && npm start"

exit
