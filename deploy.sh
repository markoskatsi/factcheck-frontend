#!/bin/bash
set -e
cd ~/factcheck-frontend
git fetch origin
git reset --hard origin/master
npm ci
CI=false npm run build
sudo cp -r build/* /var/www/factcheck/
