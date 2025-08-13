# CommandKit

A cross-platform desktop application for managing developer tools that simplify workflows and help with integrations and automation.

## Features

- **Cross-platform support**: Works on macOS, Windows, and Linux
- **Native performance**: Built with React Native for truly native widgets
- **Project management**: Download, update, and run projects through the umbrella application

## Prerequisites (Development)

To build and develop CommandKit, you need:

- Node.js (v16 or later)
- npm (v8 or later)

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
npm run dev
```

- Start the webpack dev server
- Launch the Electron application

## Manual Installation

1. **Install project dependencies:**

   ```bash
   npm install
   ```

2. **Run the application:**

   ```bash
   # Start the development server
   npm run dev
   
   # Or build and run the Electron app
   npm run electron-pack
   ```

## Building Applications

### Build for All Platforms

```bash
# Build for Windows
npm run build:windows

# Build for Linux  
npm run build:linux

# Build for macOS
npm run build:macos

# Build for all operating systems
npm run build:all
```

This creates standalone applications that can be distributed and run without development tools.

## Running the Compiled Application

Once you have built the standalone application, users can run it without any development dependencies:

### Run on Windows

- Double-click the `.exe` file
- Or run from command prompt: `CommandKit.exe`

### Run on Linux

- Run from terminal: `./CommandKit`

### Run on macOS

- Double-click the `.app` file
- Or run from terminal: `open CommandKit.app`

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
├── electron/               # Electron main process
├── public/                 # Web assets
├── package.json
├── setup.sh               # Automated setup script
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run electron-pack` - Build Electron app for all platforms
- `npm run build:macos` - Build standalone app for macOS
- `npm run build:windows` - Build standalone app for Windows
- `npm run build:linux` - Build standalone app for Linux
- `npm run test:compose:all` - Test all platform builds with Docker



## Troubleshooting

### Common Issues

1. **Build issues:**

   ```bash
   # Clean and rebuild
   npm run clean
   npm install
   ```

2. **Electron issues:**

   ```bash
   # Clear Electron cache
   rm -rf node_modules/.cache
   npm install
   ```

3. **TypeScript errors:**
   - Ensure all dependencies are installed: `npm install`

### Getting Help

- Check the [Electron documentation](https://www.electronjs.org/docs)
- Review existing GitHub issues
- Create a new issue with detailed error information

## Architecture

CommandKit is designed as an umbrella application that manages multiple developer tools:

- **Centralized Management**: All tools are managed through a single interface
- **Cross-platform**: Built with Electron for cross-platform compatibility
- **Modular Design**: Each tool is a separate module that can be downloaded and updated independently
- **Web-based UI**: Uses React for the user interface

The application uses:

- Electron for cross-platform desktop app framework
- React for the UI framework
- Node.js for file system operations and process management
- Local storage for data persistence

## Distribution

### Creating Installers

After building standalone applications, you can create installers using `electron-builder`:

- **Windows**: Creates `.exe` installers and portable executables
- **macOS**: Creates `.dmg` files and `.app` bundles
- **Linux**: Creates `.AppImage` and `.snap` packages

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
2. Review the [Electron documentation](https://www.electronjs.org/docs)
3. Search existing GitHub issues
4. Create a new issue with detailed error information

## Next Steps

Once you have CommandKit running:

1. Explore the app interface
2. Test downloading and running ReqGen and MacroBoard
3. Customize the UI and functionality as needed
4. Add new projects to the umbrella application
5. Build and distribute applications for all platforms
