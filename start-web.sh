#!/bin/bash

echo "🚀 Starting CommandKit Web-Only Desktop App..."

# Kill any existing processes
pkill -f "webpack\|electron" 2>/dev/null || true

# Create a temporary directory for web build
WEB_DIR="./web-build"
mkdir -p $WEB_DIR

# Copy necessary files
cp -r src $WEB_DIR/
cp -r electron $WEB_DIR/
cp -r public $WEB_DIR/
cp webpack.web.config.js $WEB_DIR/
cp tsconfig.web.json $WEB_DIR/
cp package.web.json $WEB_DIR/package.json

# Change to web directory
cd $WEB_DIR

# Install web-only dependencies
echo "📦 Installing web-only dependencies..."
npm install --silent

# Start webpack dev server in background
echo "📦 Starting webpack dev server..."
npm run webpack-dev &
WEBPACK_PID=$!

# Wait for webpack to be ready
echo "⏳ Waiting for webpack dev server..."
sleep 5

# Check if webpack is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Webpack dev server is ready!"
    
    # Start Electron
    echo "⚡ Starting Electron app..."
    npm run electron-dev
    
    # Cleanup
    kill $WEBPACK_PID 2>/dev/null || true
    cd ..
    rm -rf $WEB_DIR
else
    echo "❌ Webpack dev server failed to start"
    kill $WEBPACK_PID 2>/dev/null || true
    cd ..
    rm -rf $WEB_DIR
    exit 1
fi
