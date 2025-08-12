#!/bin/bash

echo "🚀 Starting CommandKit Clean Web-Only Desktop App..."

# Kill any existing processes
pkill -f "webpack\|electron" 2>/dev/null || true

# Create a completely clean web directory
WEB_DIR="./web-clean"
rm -rf $WEB_DIR
mkdir -p $WEB_DIR

# Copy only web-specific files
echo "📁 Copying web files..."
cp -r src $WEB_DIR/
cp -r electron $WEB_DIR/
cp -r public $WEB_DIR/
cp webpack.web.config.js $WEB_DIR/
cp tsconfig.web.json $WEB_DIR/
cp package.web.json $WEB_DIR/package.json

# Remove any React Native specific files from src
find $WEB_DIR/src -name "*.native.*" -delete 2>/dev/null || true
find $WEB_DIR/src -name "*Native*" -delete 2>/dev/null || true

# Change to web directory
cd $WEB_DIR

# Install only web dependencies
echo "📦 Installing web-only dependencies..."
npm install --silent --no-optional

# Start webpack dev server in background
echo "📦 Starting webpack dev server..."
npx webpack serve --config webpack.web.config.js --mode development --port 3001 &
WEBPACK_PID=$!

# Wait for webpack to be ready
echo "⏳ Waiting for webpack dev server..."
sleep 8

# Check if webpack is running
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ Webpack dev server is ready!"
    
    # Start Electron with NODE_ENV=development
    echo "⚡ Starting Electron app..."
    NODE_ENV=development npx electron .
    
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
