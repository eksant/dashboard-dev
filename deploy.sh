#!/bin/bash

AWS_S3_REGION="ap-southeast-1b"
STAGING_BRANCH="master"
PRODUCTION_BRANCH="production"

# NODE_ENV="staging"
# CLOUDFRONT_DIST_ID=$CLOUDFRONT_DIST_ID_STAGING
NODE_ENV=''
CLOUDFRONT_DIST_ID=''
if [[ $TRAVIS_BRANCH == $STAGING_BRANCH ]]; then
  NODE_ENV="staging"
  CLOUDFRONT_DIST_ID=$CLOUDFRONT_DIST_ID_STAGING
  yarn build
elif [[ $TRAVIS_BRANCH == $PRODUCTION_BRANCH ]]; then
  NODE_ENV="production"
  CLOUDFRONT_DIST_ID=$CLOUDFRONT_DIST_ID_PRODUCTION
  yarn build
else
  echo "Not deploying"
  exit
fi

S3_BUCKET="$NODE_ENV.developer.pfalfa.io"
echo "Deploying to the $S3_BUCKET bucket"

# pip install --upgrade pip
# pip install awscli --upgrade --user
sudo pip install awscli --upgrade --user
export AWS_ACCESS_KEY_ID=$ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=$SECRET_ACCESS_KEY

aws configure set region $AWS_S3_REGION --profile default

aws s3 sync public/ "s3://$S3_BUCKET" --acl public-read --delete

aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DIST_ID \
  --paths /*

# git pull origin develop
# rm -rf node_modules/ yarn.lock && yarn
# if [ -d "./build" ]; then
# rm -rf build
# fi
# yarn
# yarn build
# rm -rf /var/www/medical.seorangeksa.com/*
# cp -R build/* /var/www/medical.seorangeksa.com
