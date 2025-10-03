const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Route di test
app.get('/', (req, res) => {
  res.json({ 
    status: 'online',
    message: 'Super Trading Bot Backend - Binance API',
    version: '1.0.0'
  });
});

// Endpoint per prezzi crypto
app.get('/api/price/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const response = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ 
      error: 'Errore nel recupero del prezzo',
      details: error.message 
    });
  }
});

// Endpoint per dati 24h
app.get('/api/ticker/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const response = await axios.get(
      `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol.toUpperCase()}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ 
      error: 'Errore nel recupero dati ticker',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server online su porta ${PORT}`);
});
