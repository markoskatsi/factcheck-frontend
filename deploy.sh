#!/bin/bash
set -e
cd ~/factcheck-frontend
git fetch origin
git reset --hard origin/main
npm ci
npm run build
sudo cp -r build/* /var/www/factcheck/
