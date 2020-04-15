#!/bin/bash
# sudo chmod 755 /var/www/server.js # optional
# this will restart app/server on instance reboot
crontab -l | { cat; echo "@reboot pm2 start \"npm run startProduction\" -i 0 --name \"ege-backend\""; } | crontab -
# actually start the server
pm2 start "npm run startProduction" --name "ege-backend"