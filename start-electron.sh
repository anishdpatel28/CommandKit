#!/bin/bash

echo "🚀 Starting CommandKit Desktop App..."

# Kill any existing processes
pkill -f "webpack\|electron" 2>/dev/null || true

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
else
    echo "❌ Webpack dev server failed to start"
    kill $WEBPACK_PID 2>/dev/null || true
    exit 1
fi
