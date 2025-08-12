#!/bin/bash

echo "🚀 Starting CommandKit Simple Desktop App..."

# Kill any existing processes
pkill -f "webpack\|electron" 2>/dev/null || true

# Create a clean web directory
WEB_DIR="./web-simple"
rm -rf $WEB_DIR
mkdir -p $WEB_DIR

# Copy files
cp -r src $WEB_DIR/
cp -r electron $WEB_DIR/
cp -r public $WEB_DIR/
cp webpack.web.config.js $WEB_DIR/
cp tsconfig.web.json $WEB_DIR/
cp package.web.json $WEB_DIR/package.json

# Go to web directory
cd $WEB_DIR

# Install dependencies
npm install --silent

# Start webpack in background
echo "Starting webpack dev server..."
npx webpack serve --config webpack.web.config.js --mode development --port 3000 &
WEBPACK_PID=$!

# Wait for webpack
sleep 5

# Start electron
echo "Starting Electron..."
NODE_ENV=development npx electron .
