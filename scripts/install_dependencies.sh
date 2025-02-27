#!/bin/bash
set -e  # Exit immediately if any command fails

# Variables
S3_BUCKET="s3://dreams-staging-backet/frontend/build.zip"
DEPLOY_DIR="/var/www/html"
TMP_DIR="/tmp/deployment"

# Install required packages if not installed
sudo apt update && sudo apt install -y unzip awscli rsync

# Clean up previous temp deployment folder
sudo rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"

# Download and extract the zip file from S3
aws s3 cp "$S3_BUCKET" /tmp/build.zip

# Unzip the file
unzip -o /tmp/build.zip -d "$TMP_DIR"

# Ensure we copy all files, including hidden ones, and overwrite only changed files
sudo rsync -av --progress "$TMP_DIR/deployment/" "$DEPLOY_DIR/"

# Install Node.js dependencies if applicable
if [ -f "$DEPLOY_DIR/package.json" ]; then
    npm install --prefix "$DEPLOY_DIR"
fi

echo "Deployment completed successfully!"

