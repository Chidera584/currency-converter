import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  ActivityIndicator,
  Chip,
  Divider,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme as theme } from '../theme/theme';
import { convertCurrency, getCurrencies } from '../services/api';

const ConvertScreen = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('NGN'); // Default to Naira
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);
  const [conversionResult, setConversionResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    loadCurrencies();
  }, []);

  const loadCurrencies = async () => {
    try {
      setIsLoadingCurrencies(true);
      const response = await getCurrencies();
      setCurrencies(response.currencies);
    } catch (error) {
      Alert.alert('Error', 'Failed to load currencies');
    } finally {
      setIsLoadingCurrencies(false);
    }
  };

  const handleConvert = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    if (fromCurrency === toCurrency) {
      Alert.alert('Same Currency', 'Please select different currencies');
      return;
    }

    try {
      setIsLoading(true);
      setShowResult(false);
      
      const result = await convertCurrency(fromCurrency, toCurrency, amount);
      setConversionResult(result);
      setShowResult(true);
    } catch (error) {
      Alert.alert('Conversion Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setShowResult(false);
    setConversionResult(null);
  };

  const resetForm = () => {
    setAmount('');
    setFromCurrency('USD');
    setToCurrency('NGN');
    setShowResult(false);
    setConversionResult(null);
  };

  const formatAmount = (value) => {
    // Remove non-numeric characters except decimal point
    const cleaned = value.replace(/[^0-9.]/g, '');
    // Ensure only one decimal point
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    return cleaned;
  };

  if (isLoadingCurrencies) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading currencies...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Ionicons name="calculator" size={48} color="white" />
            <Title style={styles.headerTitle}>Convert Currency</Title>
            <Paragraph style={styles.headerSubtitle}>
              Get real-time exchange rates
            </Paragraph>
          </View>
        </LinearGradient>

        {/* Conversion Form */}
        <View style={styles.formContainer}>
          <Card style={styles.formCard}>
            <Card.Content>
              {/* Amount Input */}
              <View style={styles.inputSection}>
                <Title style={styles.inputLabel}>Amount</Title>
                <TextInput
                  mode="outlined"
                  label="Enter amount"
                  value={amount}
                  onChangeText={(text) => setAmount(formatAmount(text))}
                  keyboardType="numeric"
                  style={styles.amountInput}
                  left={<TextInput.Affix text="$" />}
                  theme={{
                    colors: {
                      primary: theme.colors.primary,
                      outline: theme.colors.outline,
                    },
                  }}
                />
              </View>

              {/* Currency Selection */}
              <View style={styles.currencySection}>
                <View style={styles.currencyRow}>
                  <View style={styles.currencyInput}>
                    <Title style={styles.inputLabel}>From</Title>
                    <View style={styles.currencyPicker}>
                      <Text style={styles.currencyCode}>{fromCurrency}</Text>
                      <Ionicons name="chevron-down" size={20} color={theme.colors.textSecondary} />
                    </View>
                    <Button
                      mode="text"
                      onPress={() => {
                        // Show currency picker modal
                        Alert.alert('Select Currency', 'Currency picker coming soon!');
                      }}
                      style={styles.currencyButton}
                    >
                      Change
                    </Button>
                  </View>

                  <View style={styles.swapButton}>
                    <Button
                      mode="contained"
                      onPress={swapCurrencies}
                      style={styles.swapButtonStyle}
                      icon="swap-horizontal"
                    >
                      Swap
                    </Button>
                  </View>

                  <View style={styles.currencyInput}>
                    <Title style={styles.inputLabel}>To</Title>
                    <View style={styles.currencyPicker}>
                      <Text style={styles.currencyCode}>{toCurrency}</Text>
                      <Ionicons name="chevron-down" size={20} color={theme.colors.textSecondary} />
                    </View>
                    <Button
                      mode="text"
                      onPress={() => {
                        // Show currency picker modal
                        Alert.alert('Select Currency', 'Currency picker coming soon!');
                      }}
                      style={styles.currencyButton}
                    >
                      Change
                    </Button>
                  </View>
                </View>
              </View>

              {/* Convert Button */}
              <View style={styles.buttonSection}>
                <Button
                  mode="contained"
                  onPress={handleConvert}
                  loading={isLoading}
                  disabled={!amount || isLoading}
                  style={styles.convertButton}
                  contentStyle={styles.convertButtonContent}
                >
                  {isLoading ? 'Converting...' : 'Convert'}
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Conversion Result */}
        {showResult && conversionResult && (
          <View style={styles.resultContainer}>
            <Card style={styles.resultCard}>
              <Card.Content>
                <Title style={styles.resultTitle}>Conversion Result</Title>
                <Divider style={styles.divider} />
                
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Amount:</Text>
                  <Text style={styles.resultValue}>
                    {conversionResult.amount} {conversionResult.from}
                  </Text>
                </View>
                
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Exchange Rate:</Text>
                  <Text style={styles.resultValue}>
                    1 {conversionResult.from} = {conversionResult.rate} {conversionResult.to}
                  </Text>
                </View>
                
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Converted Amount:</Text>
                  <Text style={styles.resultValue}>
                    {conversionResult.convertedAmount} {conversionResult.to}
                  </Text>
                </View>

                <View style={styles.resultTimestamp}>
                  <Text style={styles.timestampText}>
                    Last updated: {new Date(conversionResult.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Button
            mode="outlined"
            onPress={resetForm}
            style={styles.resetButton}
            icon="refresh"
          >
            Reset
          </Button>
        </View>

        {/* Popular Currencies */}
        <View style={styles.popularCurrenciesContainer}>
          <Title style={styles.sectionTitle}>Popular Currencies</Title>
          <View style={styles.currencyChips}>
            {['USD', 'NGN', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'].map((currency) => (
              <Chip
                key={currency}
                mode="outlined"
                onPress={() => {
                  if (fromCurrency === currency) {
                    setToCurrency(currency === 'USD' ? 'NGN' : 'USD');
                  } else {
                    setFromCurrency(currency);
                  }
                }}
                style={[
                  styles.currencyChip,
                  (fromCurrency === currency || toCurrency === currency) && styles.selectedChip,
                ]}
                textStyle={[
                  styles.chipText,
                  (fromCurrency === currency || toCurrency === currency) && styles.selectedChipText,
                ]}
              >
                {currency}
              </Chip>
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
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
  formContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginTop: -theme.spacing.lg,
  },
  formCard: {
    ...theme.shadows.medium,
    borderRadius: theme.borderRadius.lg,
  },
  inputSection: {
    marginBottom: theme.spacing.lg,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  amountInput: {
    backgroundColor: theme.colors.surface,
  },
  currencySection: {
    marginBottom: theme.spacing.lg,
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currencyInput: {
    flex: 1,
    alignItems: 'center',
  },
  currencyPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  currencyCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginRight: theme.spacing.sm,
  },
  currencyButton: {
    marginTop: theme.spacing.xs,
  },
  swapButton: {
    paddingHorizontal: theme.spacing.md,
  },
  swapButtonStyle: {
    backgroundColor: theme.colors.secondary,
  },
  buttonSection: {
    marginTop: theme.spacing.lg,
  },
  convertButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  convertButtonContent: {
    paddingVertical: theme.spacing.sm,
  },
  resultContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },
  resultCard: {
    ...theme.shadows.small,
    borderRadius: theme.borderRadius.md,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  divider: {
    marginBottom: theme.spacing.md,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  resultLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  resultValue: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '600',
  },
  resultTimestamp: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  timestampText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  quickActionsContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    alignItems: 'center',
  },
  resetButton: {
    borderColor: theme.colors.outline,
  },
  popularCurrenciesContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  currencyChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  currencyChip: {
    margin: theme.spacing.xs,
    borderColor: theme.colors.outline,
  },
  selectedChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    color: theme.colors.text,
  },
  selectedChipText: {
    color: 'white',
  },
});

export default ConvertScreen;

