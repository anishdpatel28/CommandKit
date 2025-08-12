import RNFS from 'react-native-fs';
import {Platform} from 'react-native';

export interface ProjectResult {
  success: boolean;
  version?: string;
  error?: string;
}

export class ProjectManager {
  private baseDir: string;
  private projectsDir: string;

  constructor() {
    this.baseDir = RNFS.DocumentDirectoryPath;
    this.projectsDir = `${this.baseDir}/projects`;
  }

  async downloadProject(projectName: string): Promise<ProjectResult> {
    try {
      // Create projects directory if it doesn't exist
      const exists = await RNFS.exists(this.projectsDir);
      if (!exists) {
        await RNFS.mkdir(this.projectsDir);
      }

      const projectDir = `${this.projectsDir}/${projectName}`;
      const projectExists = await RNFS.exists(projectDir);
      
      if (projectExists) {
        return {
          success: false,
          error: 'Project already exists. Use update instead.',
        };
      }

      // Create project directory
      await RNFS.mkdir(projectDir);

      // Simulate download process (replace with actual download logic)
      await this.simulateDownload(projectName, projectDir);

      // Create project metadata
      const metadata = {
        name: projectName,
        version: '1.0.0',
        installedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };

      await RNFS.writeFile(
        `${projectDir}/metadata.json`,
        JSON.stringify(metadata, null, 2),
        'utf8',
      );

      return {
        success: true,
        version: '1.0.0',
      };
    } catch (error) {
      console.error('Error downloading project:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async updateProject(projectName: string): Promise<ProjectResult> {
    try {
      const projectDir = `${this.projectsDir}/${projectName}`;
      const projectExists = await RNFS.exists(projectDir);
      
      if (!projectExists) {
        return {
          success: false,
          error: 'Project not found. Download it first.',
        };
      }

      // Read current metadata
      const metadataPath = `${projectDir}/metadata.json`;
      const metadataExists = await RNFS.exists(metadataPath);
      
      if (!metadataExists) {
        return {
          success: false,
          error: 'Project metadata not found.',
        };
      }

      const metadataContent = await RNFS.readFile(metadataPath, 'utf8');
      const metadata = JSON.parse(metadataContent);

      // Simulate update process (replace with actual update logic)
      await this.simulateUpdate(projectName, projectDir);

      // Update metadata
      const newVersion = this.incrementVersion(metadata.version);
      const updatedMetadata = {
        ...metadata,
        version: newVersion,
        lastUpdated: new Date().toISOString(),
      };

      await RNFS.writeFile(
        metadataPath,
        JSON.stringify(updatedMetadata, null, 2),
        'utf8',
      );

      return {
        success: true,
        version: newVersion,
      };
    } catch (error) {
      console.error('Error updating project:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async runProject(projectName: string): Promise<ProjectResult> {
    try {
      const projectDir = `${this.projectsDir}/${projectName}`;
      const projectExists = await RNFS.exists(projectDir);
      
      if (!projectExists) {
        return {
          success: false,
          error: 'Project not found. Download it first.',
        };
      }

      // Check if project is already running
      const isRunning = await this.isProjectRunning(projectName);
      if (isRunning) {
        return {
          success: false,
          error: 'Project is already running.',
        };
      }

      // Simulate running the project (replace with actual run logic)
      await this.simulateRun(projectName, projectDir);

      return {
        success: true,
      };
    } catch (error) {
      console.error('Error running project:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async stopProject(projectName: string): Promise<ProjectResult> {
    try {
      const isRunning = await this.isProjectRunning(projectName);
      if (!isRunning) {
        return {
          success: false,
          error: 'Project is not running.',
        };
      }

      // Simulate stopping the project (replace with actual stop logic)
      await this.simulateStop(projectName);

      return {
        success: true,
      };
    } catch (error) {
      console.error('Error stopping project:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getProjectStatus(projectName: string): Promise<{
    installed: boolean;
    version?: string;
    lastUpdated?: string;
    isRunning: boolean;
  }> {
    try {
      const projectDir = `${this.projectsDir}/${projectName}`;
      const projectExists = await RNFS.exists(projectDir);
      
      if (!projectExists) {
        return {
          installed: false,
          isRunning: false,
        };
      }

      const metadataPath = `${projectDir}/metadata.json`;
      const metadataExists = await RNFS.exists(metadataPath);
      
      if (!metadataExists) {
        return {
          installed: true,
          isRunning: await this.isProjectRunning(projectName),
        };
      }

      const metadataContent = await RNFS.readFile(metadataPath, 'utf8');
      const metadata = JSON.parse(metadataContent);

      return {
        installed: true,
        version: metadata.version,
        lastUpdated: metadata.lastUpdated,
        isRunning: await this.isProjectRunning(projectName),
      };
    } catch (error) {
      console.error('Error getting project status:', error);
      return {
        installed: false,
        isRunning: false,
      };
    }
  }

  private async simulateDownload(projectName: string, projectDir: string): Promise<void> {
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create a simple executable file based on platform
    const executableName = this.getExecutableName(projectName);
    const executablePath = `${projectDir}/${executableName}`;
    
    // Create a simple script file
    const scriptContent = this.getScriptContent(projectName);
    await RNFS.writeFile(executablePath, scriptContent, 'utf8');
    
    // Make it executable on Unix-like systems
    if (Platform.OS === 'macos' || Platform.OS === 'linux') {
      await RNFS.chmod(executablePath, '755');
    }
  }

  private async simulateUpdate(projectName: string, projectDir: string): Promise<void> {
    // Simulate update delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update the executable file
    const executableName = this.getExecutableName(projectName);
    const executablePath = `${projectDir}/${executableName}`;
    
    const scriptContent = this.getScriptContent(projectName, true);
    await RNFS.writeFile(executablePath, scriptContent, 'utf8');
  }

  private async simulateRun(projectName: string, projectDir: string): Promise<void> {
    // Simulate run delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a PID file to track running state
    const pidPath = `${projectDir}/.pid`;
    const pid = Date.now().toString();
    await RNFS.writeFile(pidPath, pid, 'utf8');
  }

  private async simulateStop(projectName: string): Promise<void> {
    // Simulate stop delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Remove PID file
    const projectDir = `${this.projectsDir}/${projectName}`;
    const pidPath = `${projectDir}/.pid`;
    const pidExists = await RNFS.exists(pidPath);
    
    if (pidExists) {
      await RNFS.unlink(pidPath);
    }
  }

  private async isProjectRunning(projectName: string): Promise<boolean> {
    try {
      const projectDir = `${this.projectsDir}/${projectName}`;
      const pidPath = `${projectDir}/.pid`;
      return await RNFS.exists(pidPath);
    } catch (error) {
      return false;
    }
  }

  private getExecutableName(projectName: string): string {
    switch (Platform.OS) {
      case 'windows':
        return `${projectName}.exe`;
      case 'macos':
      case 'linux':
        return projectName;
      default:
        return projectName;
    }
  }

  private getScriptContent(projectName: string, isUpdate: boolean = false): string {
    const version = isUpdate ? '1.1.0' : '1.0.0';
    
    switch (Platform.OS) {
      case 'windows':
        return `@echo off
echo ${projectName} v${version} is running...
echo This is a simulated ${projectName} application.
pause`;
      case 'macos':
      case 'linux':
        return `#!/bin/bash
echo "${projectName} v${version} is running..."
echo "This is a simulated ${projectName} application."
echo "Press any key to continue..."
read -n 1`;
      default:
        return `echo "${projectName} v${version} is running..."`;
    }
  }

  private incrementVersion(version: string): string {
    const parts = version.split('.');
    if (parts.length >= 3) {
      const patch = parseInt(parts[2]) + 1;
      return `${parts[0]}.${parts[1]}.${patch}`;
    }
    return version;
  }
}
