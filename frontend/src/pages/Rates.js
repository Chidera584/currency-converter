import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
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
  Button,
} from '@mui/material';
import {
  TrendingUp,
  Refresh,
} from '@mui/icons-material';
import { getExchangeRates } from '../services/api';

const Rates = () => {
  const theme = useTheme();
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRates();
  }, [baseCurrency]);

  const loadRates = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getExchangeRates(baseCurrency);
      setRates(response.rates || {});
    } catch (error) {
      setError('Failed to load exchange rates');
    } finally {
      setLoading(false);
    }
  };

  const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        📈 Exchange Rates
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Typography variant="h6">
              Base Currency:
            </Typography>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Select Currency</InputLabel>
              <Select
                value={baseCurrency}
                label="Select Currency"
                onChange={(e) => setBaseCurrency(e.target.value)}
              >
                {popularCurrencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              onClick={loadRates}
              startIcon={<Refresh />}
            >
              Refresh
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Showing {Object.keys(rates).length} exchange rates for {baseCurrency}
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {Object.entries(rates).slice(0, 20).map(([currency, rate]) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={currency}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {currency}
                </Typography>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                  {rate.toFixed(4)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  1 {baseCurrency} = {rate.toFixed(4)} {currency}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {Object.keys(rates).length === 0 && !error && (
        <Alert severity="info">
          No exchange rates available. Please try refreshing.
        </Alert>
      )}
    </Container>
  );
};

export default Rates;


