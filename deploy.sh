#!/bin/bash

git pull origin develop
# rm -rf node_modules/ yarn.lock && yarn
if [ -d "./build" ]; then
  rm -rf build
fi
# yarn 
yarn build
rm -rf /var/www/medical.seorangeksa.com/*
cp -R build/* /var/www/medical.seorangeksa.com

