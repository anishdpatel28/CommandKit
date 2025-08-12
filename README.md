# CommandKit

A cross-platform desktop application for managing developer tools that simplify workflows and help with integrations and automation.

## Features

- **Cross-platform support**: Works on macOS, Windows, and Linux
- **Native performance**: Built with React Native for truly native widgets
- **Project management**: Download, update, and run projects through the umbrella application

## Prerequisites (Development - macOS Only)

To build and develop CommandKit, you need:

- Node.js (v16 or later)
- npm (v8 or later)
- Xcode (for building the application)
- CocoaPods (for dependency management)

## Quick Start

### 1. Run the Setup Script

```bash
./setup.sh
```

- Checks platform
- Installs project dependencies
- Sets up configurations

### 2. Test the Application

```bash
./test-app.sh
```

This script will:

- Start the Metro bundler
- Launch the application on your platform
- Provide real-time feedback

## Manual Installation (macOS)

1. **Install Xcode:**
   - Download and install Xcode from the Mac App Store
   - Install Xcode Command Line Tools:

     ```bash
     xcode-select --install
     ```

2. **Install CocoaPods:**

   ```bash
   sudo gem install cocoapods
   ```

3. **Install project dependencies:**

   ```bash
   npm install
   cd ios && pod install && cd ..
   ```

4. **Run the application:**

   ```bash
   # Start Metro bundler
   npm start
   
   # In a new terminal, run the macOS app
   npm run macos
   ```

## Building Standalone Applications

### Build for macOS

```bash
npm run build:macos
```

This creates a standalone `.app` file that can be distributed and run without development tools.

### Build for Windows

```bash
npm run build:windows
```

This creates a standalone `.exe` file that can be distributed and run without development tools.

### Build for Linux

```bash
npm run build:linux
```

This creates a standalone binary that can be distributed and run without development tools.

## Running the Compiled Application

Once you have built the standalone application, users can run it without any development dependencies:

### Run on macOS

- Double-click the `.app` file
- Or run from terminal: `open CommandKit.app`

### Run on Windows

- Double-click the `.exe` file
- Or run from command prompt: `CommandKit.exe`

### Run on Linux

- Run from terminal: `./CommandKit`

## Project Structure

```text
CommandKit/
├── src/
│   ├── components/
│   │   ├── ReqGenTab.tsx
│   │   └── MacroBoardTab.tsx
│   ├── services/
│   │   └── ProjectManager.ts
│   ├── theme/
│   │   └── colors.ts
│   └── App.tsx
├── ios/                    # iOS/macOS native code
├── android/                # Android native code
├── windows/                # Windows native code
├── linux/                  # Linux native code
├── package.json
├── setup.sh               # Automated setup script
├── test-app.sh            # Test script
└── README.md
```

## Available Scripts

- `npm start` - Start Metro bundler (for development)
- `npm run macos` - Run on macOS (development)
- `npm run windows` - Run on Windows (development)
- `npm run linux` - Run on Linux (development)
- `npm run build:macos` - Build standalone app for macOS
- `npm run build:windows` - Build standalone app for Windows
- `npm run build:linux` - Build standalone app for Linux

## Why the iOS Folder Exists

React Native macOS is built on top of React Native iOS. The iOS folder contains:

- **AppDelegate.mm**: Application lifecycle management
- **Info.plist**: Application configuration and permissions
- **main.m**: Application entry point
- **Podfile**: CocoaPods dependency management
- **project.pbxproj**: Xcode project configuration

This shared foundation allows the same codebase to run on both iOS and macOS with native performance.

## Troubleshooting

### Common Issues

1. **Metro bundler issues:**

   ```bash
   # Clear Metro cache
   npx react-native start --reset-cache
   ```

2. **Native build issues:**

   ```bash
   # Clean and rebuild
   npm run clean
   npm install
   ```

3. **Permission issues on macOS:**

   ```bash
   # Fix CocoaPods permissions
   sudo gem install cocoapods
   ```

4. **TypeScript errors:**
   - The tsconfig.json has been configured for React Native
   - Ensure all dependencies are installed: `npm install`

### Getting Help

- Check the [React Native documentation](https://reactnative.dev/)
- Check the [React Native macOS documentation](https://github.com/microsoft/react-native-macos)
- Review existing GitHub issues
- Create a new issue with detailed error information

## Architecture

CommandKit is designed as an umbrella application that manages multiple developer tools:

- **Centralized Management**: All tools are managed through a single interface
- **Cross-platform**: Built with React Native for native performance across platforms
- **Modular Design**: Each tool is a separate module that can be downloaded and updated independently
- **Native Integration**: Uses platform-specific APIs for file system operations and process management

The application uses:

- React Native for the UI framework
- React Native FS for file system operations
- AsyncStorage for local data persistence
- Platform-specific native modules for system integration

## Distribution

### Creating Installers

After building standalone applications, you can create installers:

#### macOS

- Use `create-dmg` to create a `.dmg` file
- Or use `electron-builder` for more advanced packaging

#### Windows

- Use `electron-builder` to create `.msi` or `.exe` installers
- Or use `innosetup` for custom installers

#### Linux

- Create `.deb` packages for Debian/Ubuntu
- Create `.rpm` packages for Red Hat/Fedora
- Or use `AppImage` for universal distribution

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the [React Native documentation](https://reactnative.dev/)
3. Search existing GitHub issues
4. Create a new issue with detailed error information

## Next Steps

Once you have CommandKit running:

1. Explore the app interface
2. Test downloading and running ReqGen and MacroBoard
3. Customize the UI and functionality as needed
4. Add new projects to the umbrella application
5. Build and distribute standalone applications
