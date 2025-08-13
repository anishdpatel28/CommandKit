#!/bin/bash

# CommandKit Test Script
# This script helps test the CommandKit Electron application

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

echo "🚀 Starting CommandKit Electron app..."
echo ""
echo "Instructions:"
echo "1. The development server will start"
echo "2. The Electron app will launch automatically"
echo "3. You can test the application functionality"
echo ""
echo "To stop the app, press Ctrl+C in this terminal"
echo ""

# Start the development server
npm run dev

echo ""
echo "✅ Test completed!"
