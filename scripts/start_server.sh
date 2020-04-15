#!/bin/bash
# sudo chmod 755 /var/www/server.js # optional
# this will restart app/server on instance reboot
cd /var/www
crontab -l | { cat; echo "@reboot pm2 start npm -- startProduction -i 0 --name \"ege-backend\""; } | crontab -
sudo pm2 stop node-app
# actually start the server
sudo pm2 start npm -- startProduction -i 0 --name "ege-backend"