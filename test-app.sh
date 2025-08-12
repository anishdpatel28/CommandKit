#!/bin/bash

# CommandKit Test Script
# This script helps test the CommandKit React Native application

set -e

echo "🧪 Testing CommandKit..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the CommandKit project directory"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🧪 Testing CommandKit..."

# Check if we're on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Detected macOS - Setting up for macOS testing"
    echo ""
    echo "🚀 Starting CommandKit on macOS..."
    echo ""
    echo "Instructions:"
    echo "1. The Metro bundler will start in this terminal"
    echo "2. Xcode will open with the CommandKit project"
    echo "3. Build and run the project in Xcode (⌘+R)"
    echo ""
    echo "To stop the app, press Ctrl+C in this terminal"
    echo ""

    # Start Metro bundler in background
    npm start &
    METRO_PID=$!

    # Wait a moment for Metro to start
    sleep 3

    # Open Xcode
    open ios/CommandKit.xcworkspace

    echo "✅ Xcode opened with CommandKit project"
    echo "📱 Build and run the project in Xcode to see the app"
    echo ""
    echo "💡 Tips:"
    echo "   - Use ⌘+R to build and run"
    echo "   - Use ⌘+B to build only"
    echo "   - Check the console for any errors"
    echo ""

    # Wait for user to stop
    echo "Press Ctrl+C to stop the Metro bundler..."
    wait $METRO_PID

elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    echo "🪟 Detected Windows"
    echo "⚠️  Windows support is experimental"
    echo "   Please follow the manual installation instructions in README.md"
    
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "🐧 Detected Linux"
    echo "⚠️  Linux support is experimental"
    echo "   Please follow the manual installation instructions in README.md"
    
else
    echo "❌ Unsupported operating system: $OSTYPE"
    echo "   CommandKit currently supports macOS, Windows, and Linux"
    exit 1
fi

echo ""
echo "✅ Test completed!"
