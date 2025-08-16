import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Box,
  Alert,
  CircularProgress,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  CurrencyExchange,
  SwapHoriz,
  Refresh,
} from '@mui/icons-material';
import { convertCurrency, getCurrencies } from '../services/api';

const Convert = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCurrencies, setLoadingCurrencies] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'NGN'];

  useEffect(() => {
    loadCurrencies();
  }, []);

  const loadCurrencies = async () => {
    try {
      setLoadingCurrencies(true);
      const response = await getCurrencies();
      setCurrencies(response.currencies || []);
    } catch (error) {
      setError('Failed to load currencies');
    } finally {
      setLoadingCurrencies(false);
    }
  };

  const handleConvert = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (fromCurrency === toCurrency) {
      setError('Please select different currencies');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setResult(null);
      
      const response = await convertCurrency(fromCurrency, toCurrency, amount);
      setResult(response);
    } catch (error) {
      setError(error.message || 'Failed to convert currency');
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
    setError('');
  };

  const resetForm = () => {
    setAmount('');
    setFromCurrency('USD');
    setToCurrency('EUR');
    setResult(null);
    setError('');
  };

  const handleAmountChange = (value) => {
    const cleaned = value.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      setAmount(parts[0] + '.' + parts.slice(1).join(''));
    } else {
      setAmount(cleaned);
    }
  };

  if (loadingCurrencies) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        💱 Currency Converter
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Convert Currency
          </Typography>

          {/* Amount Input */}
          <TextField
            fullWidth
            label="Amount"
            type="text"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="Enter amount"
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
            }}
          />

          {/* Currency Selection */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={5}>
              <FormControl fullWidth>
                <InputLabel>From</InputLabel>
                <Select
                  value={fromCurrency}
                  label="From"
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                 {currencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}

                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={swapCurrencies}
                sx={{ minWidth: 'auto', p: 1 }}
              >
                <SwapHoriz />
              </Button>
            </Grid>

            <Grid item xs={12} sm={5}>
              <FormControl fullWidth>
                <InputLabel>To</InputLabel>
                <Select
                  value={toCurrency}
                  label="To"
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                 {currencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}

                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Convert Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleConvert}
            disabled={loading || !amount}
            startIcon={loading ? <CircularProgress size={20} /> : <CurrencyExchange />}
            sx={{ mb: 3 }}
          >
            {loading ? 'Converting...' : 'Convert'}
          </Button>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Result */}
          {result && (
            <Card sx={{ backgroundColor: 'success.light', color: 'white', mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Conversion Result
                </Typography>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {result.convertedAmount} {result.to}
                </Typography>
                <Typography variant="body2">
                  Exchange Rate: 1 {result.from} = {result.rate} {result.to}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1, opacity: 0.8 }}>
                  Last updated: {new Date(result.timestamp).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Reset Button */}
          <Button
            variant="outlined"
            onClick={resetForm}
            startIcon={<Refresh />}
            fullWidth
          >
            Reset
          </Button>
        </CardContent>
      </Card>

      {/* Popular Currencies */}
      {/* <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Popular Currencies
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {popularCurrencies.map((currency) => (
              <Chip
                key={currency}
                label={currency}
                clickable
                onClick={() => {
                  if (fromCurrency === currency) {
                    setToCurrency(currency === 'USD' ? 'EUR' : 'USD');
                  } else {
                    setFromCurrency(currency);
                  }
                }}
                color={fromCurrency === currency || toCurrency === currency ? 'primary' : 'default'}
                variant={fromCurrency === currency || toCurrency === currency ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </CardContent>
      </Card> */}
    </Container>
  );
};

export default Convert;


