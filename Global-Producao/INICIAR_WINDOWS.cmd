@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Instale o Node.js 24 LTS de https://nodejs.org e execute novamente.
  pause
  exit /b 1
)
node -e "if(Number(process.versions.node.split('.')[0])!==24)process.exit(1)"
if errorlevel 1 (
  echo Este pacote foi preparado para Node.js 24 LTS.
  pause
  exit /b 1
)
node scripts/needs-setup.mjs
if errorlevel 1 (
  node scripts/admin.mjs
  if errorlevel 1 (
    pause
    exit /b 1
  )
)
echo Abra http://localhost:3000 no navegador. Mantenha esta janela aberta.
node server/index.mjs
pause
