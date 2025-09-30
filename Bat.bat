@echo off
REM ============================
REM Git Setup and Push Script
REM Project: online-learning-backend
REM ============================

:: Change directory to your project folder
cd /d "%~dp0online-learning-backend"

:: Initialize Git if not already done
if not exist ".git" (
    echo Initializing new Git repository...
    git init
)

:: Configure Git user (set only if not already configured)
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

:: Create .gitignore if not exists
if not exist ".gitignore" (
    echo node_modules/ > .gitignore
    echo .env >> .gitignore
)

:: Add all project files
git add .

:: Commit changes
git commit -m "Initial commit - Online Learning Backend"

:: Ensure branch is main
git branch -M main

:: Remove old remote if exists
git remote remove origin 2>nul

:: Add new remote (change URL to your repo)
git remote add origin https://github.com/your-username/online-learning-backend.git

:: Push to GitHub
git push -u origin main

echo ============================
echo Project successfully pushed!
echo Check GitHub repository now.
echo ============================

pause
