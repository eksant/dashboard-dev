#!/bin/bash

git pull origin master
# rm -rf node_modules/ yarn.lock && yarn
if [ -d "./build" ]; then
  rm -rf build
fi
yarn build
rm -rf /var/www/medical.seorangeksa.com/*
cp -R html/* /var/www/medical.seorangeksa.com

