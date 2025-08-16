const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());



// -------------------- API ROUTES --------------------

// Currency conversion endpoint
app.get('/api/convert', async (req, res) => {
  try {
    const { from, to, amount } = req.query;
    
    if (!from || !to || !amount) {
      return res.status(400).json({ 
        error: 'Missing required parameters: from, to, amount' 
      });
    }

    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/${from}`
    );

    const rates = response.data.rates;
    const rate = rates[to];
    
    if (!rate) {
      return res.status(400).json({ error: 'Invalid currency code' });
    }

    const convertedAmount = (parseFloat(amount) * rate).toFixed(2);
    
    res.json({
      from,
      to,
      amount: parseFloat(amount),
      rate,
      convertedAmount: parseFloat(convertedAmount),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Failed to convert currency' });
  }
});

// Get available currencies
app.get('/api/currencies', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.exchangerate-api.com/v4/latest/USD'
    );
    
    const currencies = Object.keys(response.data.rates);
    currencies.unshift('USD'); // Add USD to the list
    
    res.json({
      currencies: currencies.sort(),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Currencies error:', error);
    res.status(500).json({ error: 'Failed to fetch currencies' });
  }
});

// Get exchange rates for a base currency
app.get('/api/rates/:base', async (req, res) => {
  try {
    const { base } = req.params;
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/${base}`
    );
    
    res.json({
      base,
      rates: response.data.rates,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Rates error:', error);
    res.status(500).json({ error: 'Failed to fetch exchange rates' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// -------------------- SERVE REACT FRONTEND --------------------
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
  });
}

// -------------------- ERROR HANDLING --------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Currency Converter API + Frontend ready!`);
});
