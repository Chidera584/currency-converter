import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  ActivityIndicator,
  Chip,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme as theme } from '../theme/theme';
import { getExchangeRates, getCurrencies } from '../services/api';

const RatesScreen = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [rates, setRates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadRates();
  }, [baseCurrency]);

  const loadRates = async () => {
    try {
      setIsLoading(true);
      const response = await getExchangeRates(baseCurrency);
      setRates(response.rates);
    } catch (error) {
      Alert.alert('Error', 'Failed to load exchange rates');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadRates();
    setIsRefreshing(false);
  };

  const changeBaseCurrency = (currency) => {
    setBaseCurrency(currency);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading exchange rates...</Text>
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
      {/* Header */}
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Ionicons name="trending-up" size={48} color="white" />
          <Title style={styles.headerTitle}>Exchange Rates</Title>
          <Paragraph style={styles.headerSubtitle}>
            Real-time currency exchange rates
          </Paragraph>
        </View>
      </LinearGradient>

      {/* Base Currency Selection */}
      <View style={styles.baseCurrencyContainer}>
        <Card style={styles.baseCurrencyCard}>
          <Card.Content>
            <Title style={styles.baseCurrencyTitle}>Base Currency: {baseCurrency}</Title>
            <View style={styles.currencyChips}>
              {['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'].map((currency) => (
                <Chip
                  key={currency}
                  mode={baseCurrency === currency ? 'flat' : 'outlined'}
                  onPress={() => changeBaseCurrency(currency)}
                  style={[
                    styles.currencyChip,
                    baseCurrency === currency && styles.selectedCurrencyChip,
                  ]}
                >
                  {currency}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Exchange Rates */}
      <View style={styles.ratesContainer}>
        <Title style={styles.ratesTitle}>
          Exchange Rates ({Object.keys(rates).length})
        </Title>
        
        {Object.entries(rates).slice(0, 20).map(([currency, rate]) => (
          <Card key={currency} style={styles.rateCard}>
            <Card.Content style={styles.rateCardContent}>
              <View style={styles.rateInfo}>
                <Text style={styles.currencyCode}>{currency}</Text>
                <Text style={styles.rateText}>
                  1 {baseCurrency} = {rate.toFixed(4)} {currency}
                </Text>
              </View>
            </Card.Content>
          </Card>
        ))}
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
  baseCurrencyContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginTop: -theme.spacing.lg,
  },
  baseCurrencyCard: {
    ...theme.shadows.medium,
    borderRadius: theme.borderRadius.lg,
  },
  baseCurrencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  currencyChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  currencyChip: {
    margin: theme.spacing.xs,
    borderColor: theme.colors.outline,
  },
  selectedCurrencyChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  ratesContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },
  ratesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  rateCard: {
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
    borderRadius: theme.borderRadius.md,
  },
  rateCardContent: {
    padding: theme.spacing.md,
  },
  rateInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currencyCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  rateText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});

export default RatesScreen;
