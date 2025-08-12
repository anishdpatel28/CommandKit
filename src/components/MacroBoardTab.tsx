import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors } from '../theme/colors';
import { ProjectManager } from '../services/ProjectManager';

interface MacroBoardStatus {
  installed: boolean;
  version: string;
  lastUpdated: string;
  isRunning: boolean;
}

const MacroBoardTab = () => {
  const [status, setStatus] = useState<MacroBoardStatus>({
    installed: false,
    version: '',
    lastUpdated: '',
    isRunning: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMacroBoardStatus();
  }, []);

  const loadMacroBoardStatus = async () => {
    try {
      const storedStatus = await AsyncStorage.getItem('macroboard_status');
      if (storedStatus) {
        setStatus(JSON.parse(storedStatus));
      }
    } catch (error) {
      console.error('Error loading MacroBoard status:', error);
    }
  };

  const saveMacroBoardStatus = async (newStatus: MacroBoardStatus) => {
    try {
      await AsyncStorage.setItem('macroboard_status', JSON.stringify(newStatus));
      setStatus(newStatus);
    } catch (error) {
      console.error('Error saving MacroBoard status:', error);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const projectManager = new ProjectManager();
      const result = await projectManager.downloadProject('macroboard');

      if (result.success) {
        const newStatus = {
          installed: true,
          version: result.version || '1.0.0',
          lastUpdated: new Date().toISOString(),
          isRunning: false,
        };
        await saveMacroBoardStatus(newStatus);
        Alert.alert('Success', 'MacroBoard downloaded successfully!');
      } else {
        Alert.alert('Error', result.error || 'Failed to download MacroBoard');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to download MacroBoard');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const projectManager = new ProjectManager();
      const result = await projectManager.updateProject('macroboard');

      if (result.success) {
        const newStatus = {
          ...status,
          version: result.version || status.version,
          lastUpdated: new Date().toISOString(),
        };
        await saveMacroBoardStatus(newStatus);
        Alert.alert('Success', 'MacroBoard updated successfully!');
      } else {
        Alert.alert('Error', result.error || 'Failed to update MacroBoard');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update MacroBoard');
    } finally {
      setLoading(false);
    }
  };

  const handleRun = async () => {
    if (!status.installed) {
      Alert.alert('Error', 'Please download MacroBoard first');
      return;
    }

    setLoading(true);
    try {
      const projectManager = new ProjectManager();
      const result = await projectManager.runProject('macroboard');

      if (result.success) {
        const newStatus = { ...status, isRunning: true };
        await saveMacroBoardStatus(newStatus);
        Alert.alert('Success', 'MacroBoard is now running!');
      } else {
        Alert.alert('Error', result.error || 'Failed to run MacroBoard');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to run MacroBoard');
    } finally {
      setLoading(false);
    }
  };

  const handleStop = async () => {
    setLoading(true);
    try {
      const projectManager = new ProjectManager();
      const result = await projectManager.stopProject('macroboard');

      if (result.success) {
        const newStatus = { ...status, isRunning: false };
        await saveMacroBoardStatus(newStatus);
        Alert.alert('Success', 'MacroBoard stopped successfully!');
      } else {
        Alert.alert('Error', result.error || 'Failed to stop MacroBoard');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to stop MacroBoard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="keyboard" size={48} color={colors.primary} />
        <Text style={styles.title}>MacroBoard</Text>
        <Text style={styles.description}>
          Create and manage keyboard macros for automation
        </Text>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Status</Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Installed:</Text>
          <View style={styles.statusValue}>
            <Icon
              name={status.installed ? 'check-circle' : 'cancel'}
              size={20}
              color={status.installed ? colors.success : colors.error}
            />
            <Text
              style={[
                styles.statusText,
                { color: status.installed ? colors.success : colors.error },
              ]}>
              {status.installed ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
        {status.installed && (
          <>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Version:</Text>
              <Text style={styles.statusText}>{status.version}</Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Last Updated:</Text>
              <Text style={styles.statusText}>
                {new Date(status.lastUpdated).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Running:</Text>
              <View style={styles.statusValue}>
                <Icon
                  name={status.isRunning ? 'play-circle' : 'stop-circle'}
                  size={20}
                  color={status.isRunning ? colors.success : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.statusText,
                    {
                      color: status.isRunning ? colors.success : colors.textSecondary,
                    },
                  ]}>
                  {status.isRunning ? 'Yes' : 'No'}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>

      <View style={styles.actionsContainer}>
        {!status.installed ? (
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleDownload}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Icon name="download" size={20} color="white" />
                <Text style={styles.buttonText}>Download MacroBoard</Text>
              </>
            )}
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleUpdate}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color={colors.primary} />
              ) : (
                <>
                  <Icon name="update" size={20} color={colors.primary} />
                  <Text style={[styles.buttonText, { color: colors.primary }]}>
                    Update
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {!status.isRunning ? (
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={handleRun}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Icon name="play-arrow" size={20} color="white" />
                    <Text style={styles.buttonText}>Run MacroBoard</Text>
                  </>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.errorButton]}
                onPress={handleStop}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Icon name="stop" size={20} color="white" />
                    <Text style={styles.buttonText}>Stop MacroBoard</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 20,
  },
  statusCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  statusValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  actionsContainer: {
    gap: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  errorButton: {
    backgroundColor: colors.error,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 8,
  },
});

export default MacroBoardTab;
