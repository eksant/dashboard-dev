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

# Install s3cmd (https://s3tools.org/repositories)
wget -O- -q http://s3tools.org/repo/deb-all/stable/s3tools.key | sudo apt-key add -
sudo wget -O/etc/apt/sources.list.d/s3tools.list http://s3tools.org/repo/deb-all/stable/s3tools.list
sudo apt-get update && sudo apt-get install s3cmd

# Deploy S3
s3cmd --access_key=$ACCESS_KEY_ID --secret_key=$SECRET_ACCESS_KEY sync build/* s3://$S3_BUCKET

# sudo -H pip install awscli --upgrade --user
# export AWS_ACCESS_KEY_ID=$ACCESS_KEY_ID
# export AWS_SECRET_ACCESS_KEY=$SECRET_ACCESS_KEY

# aws configure set region $AWS_S3_REGION --profile default

# aws s3 sync public/ "s3://$S3_BUCKET" --acl public-read --delete

# aws cloudfront create-invalidation \
#   --distribution-id $CLOUDFRONT_DIST_ID \
#   --paths /*
