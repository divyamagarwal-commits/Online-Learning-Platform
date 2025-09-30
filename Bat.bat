@echo off
REM ==========================================
REM Create Online Learning Backend Folder Setup
REM and Push to GitHub
REM ==========================================

:: Set project root
set PROJECT_DIR=%~dp0online-learning-backend

:: Create folder structure
echo Creating project folder structure...

mkdir "%PROJECT_DIR%\src\config"
mkdir "%PROJECT_DIR%\src\controllers"
mkdir "%PROJECT_DIR%\src\middleware"
mkdir "%PROJECT_DIR%\src\models"
mkdir "%PROJECT_DIR%\src\routes"
mkdir "%PROJECT_DIR%\src\utils"
mkdir "%PROJECT_DIR%\database"

:: Create placeholder files
echo // Database config > "%PROJECT_DIR%\src\config\database.js"
echo // Auth Controller > "%PROJECT_DIR%\src\controllers\authController.js"
echo // App Entry Point > "%PROJECT_DIR%\src\app.js"

echo CREATE TABLE users (...); > "%PROJECT_DIR%\database\schema.sql"
echo INSERT INTO users VALUES (...); > "%PROJECT_DIR%\database\seeds.sql"

echo # Online Learning Backend > "%PROJECT_DIR%\README.md"
echo node_modules/ > "%PROJECT_DIR%\.gitignore"
echo .env >> "%PROJECT_DIR%\.gitignore"

:: Create empty .env file
type nul > "%PROJECT_DIR%\.env"

:: Initialize package.json (if npm is available)
cd /d "%PROJECT_DIR%"
if not exist "package.json" (
    echo Initializing npm...
    npm init -y >nul 2>&1
)

:: Initialize Git
if not exist ".git" (
    echo Initializing git repo...
    git init
)

:: Configure Git user
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

:: Add and commit
git add .
git commit -m "Initial commit - Online Learning Backend"

:: Ensure branch is main
git branch -M main

:: Remove old origin if exists
git remote remove origin 2>nul

:: Add new origin (replace with your GitHub repo URL)
git remote add origin https://github.com/your-username/online-learning-backend.git

:: Push to GitHub
git push -u origin main

echo ==========================================
echo Project setup complete and pushed to GitHub!
echo Location: %PROJECT_DIR%
echo ==========================================

pause
