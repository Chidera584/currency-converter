import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { Card, Title, Paragraph, Button, ActivityIndicator } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme as theme } from '../theme/theme';
import { checkHealth, getCurrencies } from '../services/api';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking');
  const [currencyCount, setCurrencyCount] = useState(0);

  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    try {
      const health = await checkHealth();
      setServerStatus('online');
      
      const currencies = await getCurrencies();
      setCurrencyCount(currencies.currencies.length);
    } catch (error) {
      setServerStatus('offline');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await checkServerStatus();
    setIsRefreshing(false);
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
        return 'Checking...';
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header Section */}
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Ionicons name="cash-outline" size={48} color="white" />
          <Title style={styles.headerTitle}>Currency Converter</Title>
          <Paragraph style={styles.headerSubtitle}>
            Convert currencies with real-time exchange rates
          </Paragraph>
        </View>
      </LinearGradient>

      {/* Status Card */}
      <View style={styles.statusContainer}>
        <Card style={styles.statusCard}>
          <Card.Content style={styles.statusContent}>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
              <Text style={styles.statusText}>Server Status: {getStatusText()}</Text>
            </View>
            <Text style={styles.statusSubtext}>
              {currencyCount} currencies available
            </Text>
          </Card.Content>
        </Card>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Title style={styles.sectionTitle}>Quick Actions</Title>
        
        <View style={styles.actionCards}>
          <Card
            style={styles.actionCard}
            onPress={() => navigation.navigate('Convert')}
          >
            <Card.Content style={styles.actionCardContent}>
              <Ionicons name="calculator" size={32} color={theme.colors.primary} />
              <Title style={styles.actionCardTitle}>Convert</Title>
              <Paragraph style={styles.actionCardSubtitle}>
                Convert between currencies
              </Paragraph>
            </Card.Content>
          </Card>

          <Card
            style={styles.actionCard}
            onPress={() => navigation.navigate('Settings')}
          >
            <Card.Content style={styles.actionCardContent}>
              <Ionicons name="settings" size={32} color={theme.colors.secondary} />
              <Title style={styles.actionCardTitle}>Settings</Title>
              <Paragraph style={styles.actionCardSubtitle}>
                Customize your app
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>
        <Title style={styles.sectionTitle}>Features</Title>
        
        <Card style={styles.featureCard}>
          <Card.Content>
            <View style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={24} color={theme.colors.success} />
              <Text style={styles.featureText}>Real-time exchange rates</Text>
            </View>
            <View style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={24} color={theme.colors.success} />
              <Text style={styles.featureText}>170+ world currencies</Text>
            </View>
            <View style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={24} color={theme.colors.success} />
              <Text style={styles.featureText}>Offline support</Text>
            </View>
            <View style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={24} color={theme.colors.success} />
              <Text style={styles.featureText}>Beautiful UI/UX</Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Built with ❤️ using React Native & Express.js
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.textSecondary,
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
  statusContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginTop: -theme.spacing.lg,
  },
  statusCard: {
    ...theme.shadows.medium,
    borderRadius: theme.borderRadius.lg,
  },
  statusContent: {
    padding: theme.spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing.sm,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  statusSubtext: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: 24,
  },
  actionsContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  actionCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
    ...theme.shadows.small,
  },
  actionCardContent: {
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  actionCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  actionCardSubtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  featuresContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.xl,
  },
  featureCard: {
    ...theme.shadows.small,
    borderRadius: theme.borderRadius.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  featureText: {
    fontSize: 14,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
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
});

export default HomeScreen;

