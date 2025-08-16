import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Convert from './pages/Convert';
import Rates from './pages/Rates';
import Settings from './pages/Settings';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B2635', // Merlot/Wine
      dark: '#6B1F2A',
      light: '#B84A5A',
    },
    secondary: {
      main: '#C17817', // Gold
      dark: '#9A5F12',
      light: '#D4A574',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <Box sx={{ pt: 8, pb: 4 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/convert" element={<Convert />} />
              <Route path="/rates" element={<Rates />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
