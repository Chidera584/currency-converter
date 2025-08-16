// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- MIDDLEWARE --------------------
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'",
          "http://localhost:3000",
          "http://localhost:5000",
          "https://api.exchangerate-api.com",
          "https://api.exchangerate.host"
        ],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:"]
      }
    }
  })
);

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// -------------------- API ROUTES --------------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Currency conversion
app.get('/api/convert', async (req, res) => {
  try {
    const { from, to, amount } = req.query;
    if (!from || !to || !amount) return res.status(400).json({ error: 'Missing parameters' });

    const { data } = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
    if (!data || !data.rates) throw new Error('No rates from API');

    const rate = data.rates[to];
    if (!rate) return res.status(400).json({ error: 'Invalid currency code' });

    res.json({
      from,
      to,
      amount: parseFloat(amount),
      rate,
      convertedAmount: parseFloat((parseFloat(amount) * rate).toFixed(2)),
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Convert error:', err.message);
    res.status(500).json({ error: 'Failed to convert currency' });
  }
});

// Get available currencies
app.get('/api/currencies', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    if (!data || !data.rates) throw new Error('No rates from API');

    const currencies = Object.keys(data.rates).sort();
    res.json({ currencies, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error('Currencies error:', err.message);

    // Fallback list so frontend never breaks
    const fallbackCurrencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY"];
    res.json({ currencies: fallbackCurrencies, timestamp: new Date().toISOString(), note: 'Fallback used' });
  }
});

// Get exchange rates for a base currency
app.get('/api/rates/:base', async (req, res) => {
  try {
    const { base } = req.params;
    const { data } = await axios.get(`https://api.exchangerate-api.com/v4/latest/${base}`);
    if (!data || !data.rates) throw new Error('No rates from API');

    res.json({ base, rates: data.rates, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error('Rates error:', err.message);
    res.status(500).json({ error: 'Failed to fetch exchange rates' });
  }
});

// -------------------- SERVE FRONTEND --------------------
const buildPath = path.join(__dirname, '../frontend/build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get('*', (req, res) => res.sendFile(path.join(buildPath, 'index.html')));
}

// -------------------- ERROR HANDLING --------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// -------------------- START SERVER --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
