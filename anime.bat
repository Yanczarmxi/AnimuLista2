@echo off
set "host=127.0.0.1:2137"
set "content=public"

explorer "http://%host%/"
php -S %host% -t %content%