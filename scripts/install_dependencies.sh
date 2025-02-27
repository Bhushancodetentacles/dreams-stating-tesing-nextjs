#!/bin/bash
set -e  # Exit immediately if any command fails

# Variables
S3_BUCKET="s3://dreams-staging-backet/frontend/build.zip"
DEPLOY_DIR="/var/www/html"
TMP_DIR="/tmp/deployment"

# Install unzip if not installed
sudo apt update && sudo apt install -y unzip awscli

# Clean up previous deployment if any
sudo rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"

# Download and extract the zip file from S3
aws s3 cp "$S3_BUCKET" /tmp/build.zip

# Unzip the file
unzip /tmp/build.zip -d "$TMP_DIR"

# Enable moving hidden files (.*)
shopt -s dotglob

# Move all extracted files (including hidden files/folders) to the deploy directory
sudo rm -rf "$DEPLOY_DIR/*"
sudo mv "$TMP_DIR/deployment/"* "$DEPLOY_DIR/"

npm install --prefix "$DEPLOY_DIR"

echo "Files (including hidden files) deployed successfully!"
