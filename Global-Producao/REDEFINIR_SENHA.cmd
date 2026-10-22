@echo off
cd /d "%~dp0"
echo Feche primeiro o servidor do sistema com Ctrl+C.
echo Esta ferramenta redefine apenas a senha do login escolhido.
pause
node REDEFINIR_SENHA.mjs
pause
