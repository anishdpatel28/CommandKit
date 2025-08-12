#!/bin/bash

# CommandKit Setup Script
# This script helps set up the CommandKit React Native project on macOS

set -e

echo "🚀 Setting up CommandKit..."

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ This setup script is designed for macOS only."
    echo "   For other platforms, please follow the manual installation instructions in README.md"
    exit 1
fi

echo "🍎 Detected macOS"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first:"
    echo "   brew install node"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm first."
    exit 1
fi
echo "✅ npm version: $(npm -v)"

# Check Xcode
if ! xcode-select -p &> /dev/null; then
    echo "❌ Xcode not found. Please install Xcode from the App Store."
    exit 1
fi
echo "✅ Xcode is installed"

# Check Ruby version and install CocoaPods
echo "🔍 Checking Ruby versions..."

# Check system Ruby
SYSTEM_RUBY_VERSION=$(/usr/bin/ruby -v 2>/dev/null | cut -d' ' -f2 | cut -d'p' -f1 || echo "not found")
echo "   System Ruby: $SYSTEM_RUBY_VERSION"

# Check Homebrew Ruby
if [ -f "/opt/homebrew/Cellar/ruby/3.4.5/bin/ruby" ]; then
    HOMEBREW_RUBY_VERSION=$(/opt/homebrew/Cellar/ruby/3.4.5/bin/ruby -v 2>/dev/null | cut -d' ' -f2 | cut -d'p' -f1 || echo "not found")
    echo "   Homebrew Ruby: $HOMEBREW_RUBY_VERSION"
    HAS_HOMEBREW_RUBY=true
else
    echo "   Homebrew Ruby: not found"
    HAS_HOMEBREW_RUBY=false
fi

# Check if CocoaPods is installed
if ! command -v pod &> /dev/null; then
    echo "📦 CocoaPods not found. Installing..."
    
    if [ "$HAS_HOMEBREW_RUBY" = true ]; then
        echo "🔧 Using Homebrew Ruby to install CocoaPods..."
        if /opt/homebrew/Cellar/ruby/3.4.5/bin/gem install cocoapods; then
            echo "✅ CocoaPods installed successfully with Homebrew Ruby"
            echo ""
            echo "💡 To use CocoaPods in the future, you can:"
            echo "   1. Add Homebrew Ruby to your PATH:"
            echo "      echo 'export PATH=\"/opt/homebrew/Cellar/ruby/3.4.5/bin:\$PATH\"' >> ~/.zshrc"
            echo "      source ~/.zshrc"
            echo "   2. Or use the full path: /opt/homebrew/Cellar/ruby/3.4.5/bin/pod"
        else
            echo "❌ Failed to install CocoaPods with Homebrew Ruby"
            exit 1
        fi
    else
        echo "⚠️  System Ruby version $SYSTEM_RUBY_VERSION is too old for latest CocoaPods."
        echo "   Latest CocoaPods requires Ruby >= 3.1.0"
        echo ""
        echo "💡 Quick Solutions (choose one):"
        echo ""
        echo "Option 1 - Install Homebrew Ruby (Recommended):"
        echo "   brew install ruby"
        echo "   Then run this script again"
        echo ""
        echo "Option 2 - Use rbenv:"
        echo "   brew install rbenv ruby-build"
        echo "   rbenv install 3.2.2"
        echo "   rbenv global 3.2.2"
        echo "   Then run this script again"
        echo ""
        echo "Option 3 - Continue without CocoaPods (manual install later):"
        echo "   You can continue setup and install CocoaPods manually later"
        echo ""
        echo "Would you like to continue with the setup and install CocoaPods manually later? (y/n)"
        read -r response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            echo "⚠️  Continuing without CocoaPods. You'll need to install it manually later."
            echo "   Run: cd ios && /opt/homebrew/Cellar/ruby/3.4.5/bin/pod install && cd .."
        else
            echo "❌ Setup cancelled. Please install a newer Ruby version and try again."
            exit 1
        fi
    fi
else
    echo "✅ CocoaPods is installed"
fi

# Install project dependencies
echo "📦 Installing project dependencies..."
if npm install; then
    echo "✅ Project dependencies installed"
else
    echo "❌ Failed to install project dependencies"
    exit 1
fi

# Install iOS/macOS dependencies
echo "📦 Installing iOS/macOS dependencies..."
if [ "$HAS_HOMEBREW_RUBY" = true ]; then
    cd ios && /opt/homebrew/Cellar/ruby/3.4.5/bin/pod install && cd ..
else
    echo "⚠️  Skipping iOS/macOS dependencies (CocoaPods not available)"
    echo "   You can install them later with: cd ios && pod install && cd .."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🚀 To run the application:"
echo "   1. Start the Metro bundler: npm start"
echo "   2. Open Xcode: open ios/CommandKit.xcworkspace"
echo "   3. Build and run the project in Xcode"
echo ""
echo "📖 For more information, see README.md"
