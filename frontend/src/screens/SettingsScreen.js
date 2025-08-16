import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Switch,
  List,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme as theme } from '../theme/theme';
import { checkHealth } from '../services/api';

const SettingsScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [serverStatus, setServerStatus] = useState('unknown');
  
  // Get the dark mode state from route params or context
  const isDarkMode = route?.params?.isDarkMode || false;
  const toggleTheme = route?.params?.toggleTheme || (() => {});

  const checkServerStatus = async () => {
    try {
      setIsLoading(true);
      await checkHealth();
      setServerStatus('online');
      Alert.alert('Success', 'Server is online and responding!');
    } catch (error) {
      setServerStatus('offline');
      Alert.alert('Error', 'Server is offline or not responding');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = () => {
    switch (serverStatus) {
      case 'online':
        return theme.colors.success;
      case 'offline':
        return theme.colors.error;
      default:
        return theme.colors.warning;
    }
  };

  const getStatusText = () => {
    switch (serverStatus) {
      case 'online':
        return 'Online';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  const openPrivacyPolicy = () => {
    Alert.alert('Privacy Policy', 'Privacy policy would open here');
  };

  const openTermsOfService = () => {
    Alert.alert('Terms of Service', 'Terms of service would open here');
  };

  const contactSupport = () => {
    Alert.alert('Contact Support', 'Support contact form would open here');
  };

  const rateApp = () => {
    Alert.alert('Rate App', 'App store rating would open here');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Ionicons name="settings" size={48} color="white" />
          <Title style={styles.headerTitle}>Settings</Title>
          <Paragraph style={styles.headerSubtitle}>
            Customize your app experience
          </Paragraph>
        </View>
      </LinearGradient>

      {/* App Preferences */}
      <View style={styles.sectionContainer}>
        <Title style={styles.sectionTitle}>App Preferences</Title>
        
        <Card style={styles.preferencesCard}>
          <Card.Content>
            <List.Item
              title="Push Notifications"
              description="Receive updates about exchange rates"
              left={(props) => <List.Icon {...props} icon="bell" />}
              right={() => (
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  color={theme.colors.primary}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Dark Mode"
              description="Use dark theme (coming soon)"
              left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => (
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleTheme}
                  color={theme.colors.primary}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Auto Refresh"
              description="Automatically update rates every 5 minutes"
              left={(props) => <List.Icon {...props} icon="refresh" />}
              right={() => (
                <Switch
                  value={autoRefresh}
                  onValueChange={setAutoRefresh}
                  color={theme.colors.primary}
                />
              )}
            />
          </Card.Content>
        </Card>
      </View>

      {/* Server Status */}
      <View style={styles.sectionContainer}>
        <Title style={styles.sectionTitle}>Server Status</Title>
        
        <Card style={styles.statusCard}>
          <Card.Content>
            <View style={styles.statusRow}>
              <View style={styles.statusInfo}>
                <Text style={styles.statusLabel}>Backend Server</Text>
                <View style={styles.statusIndicator}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
                  <Text style={styles.statusText}>{getStatusText()}</Text>
                </View>
              </View>
              <Button
                mode="outlined"
                onPress={checkServerStatus}
                loading={isLoading}
                disabled={isLoading}
                style={styles.checkButton}
              >
                Check Status
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* About */}
      <View style={styles.sectionContainer}>
        <Title style={styles.sectionTitle}>About</Title>
        
        <Card style={styles.aboutCard}>
          <Card.Content>
            <View style={styles.appInfo}>
              <Ionicons name="cash-outline" size={48} color={theme.colors.primary} />
              <Title style={styles.appName}>Currency Converter</Title>
              <Text style={styles.appVersion}>Version 1.0.0</Text>
              <Text style={styles.appDescription}>
                A beautiful and user-friendly currency converter app built with React Native and Express.js
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Support & Legal */}
      <View style={styles.sectionContainer}>
        <Title style={styles.sectionTitle}>Support & Legal</Title>
        
        <Card style={styles.supportCard}>
          <Card.Content>
            <List.Item
              title="Contact Support"
              description="Get help with the app"
              left={(props) => <List.Icon {...props} icon="help-circle" />}
              onPress={contactSupport}
            />
            <Divider />
            <List.Item
              title="Rate App"
              description="Rate us on the app store"
              left={(props) => <List.Icon {...props} icon="star" />}
              onPress={rateApp}
            />
            <Divider />
            <List.Item
              title="Privacy Policy"
              description="Read our privacy policy"
              left={(props) => <List.Icon {...props} icon="shield-check" />}
              onPress={openPrivacyPolicy}
            />
            <Divider />
            <List.Item
              title="Terms of Service"
              description="Read our terms of service"
              left={(props) => <List.Icon {...props} icon="file-document" />}
              onPress={openTermsOfService}
            />
          </Card.Content>
        </Card>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
       
        </Text>
        <Text style={styles.footerSubtext}>
          © 2024 Currency Converter App
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
  sectionContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  preferencesCard: {
    ...theme.shadows.small,
    borderRadius: theme.borderRadius.md,
  },
  statusCard: {
    ...theme.shadows.small,
    borderRadius: theme.borderRadius.md,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusInfo: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing.sm,
  },
  statusText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  checkButton: {
    borderColor: theme.colors.primary,
  },
  aboutCard: {
    ...theme.shadows.small,
    borderRadius: theme.borderRadius.md,
  },
  appInfo: {
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  appVersion: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  appDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
    textAlign: 'center',
    lineHeight: 20,
  },
  supportCard: {
    ...theme.shadows.small,
    borderRadius: theme.borderRadius.md,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 10,
    color: theme.colors.textDisabled,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
});

export default SettingsScreen;

