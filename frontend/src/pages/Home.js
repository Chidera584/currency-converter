import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  Chip,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  CurrencyExchange,
  TrendingUp,
  Settings,
  CheckCircle,
  Speed,
  Security,
  Devices,
} from '@mui/icons-material';
import { checkHealth, getCurrencies } from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [serverStatus, setServerStatus] = useState('checking');
  const [currencyCount, setCurrencyCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    try {
      const health = await checkHealth();
      setServerStatus('online');
      
      const currencies = await getCurrencies();
      setCurrencyCount(currencies.currencies?.length || 0);
    } catch (error) {
      setServerStatus('offline');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Speed />,
      title: 'Real-time Rates',
      description: 'Get live exchange rates updated every minute',
    },
    {
      icon: <Security />,
      title: 'Secure & Reliable',
      description: 'Trusted API with 99.9% uptime guarantee',
    },
    {
      icon: <Devices />,
      title: 'Responsive Design',
      description: 'Works perfectly on all devices and screen sizes',
    },
  ];

  const quickActions = [
    {
      title: 'Convert Currency',
      description: 'Convert between 170+ world currencies',
      icon: <CurrencyExchange />,
      path: '/convert',
      color: 'primary',
    },
    {
      title: 'View Rates',
      description: 'See current exchange rates for all currencies',
      icon: <TrendingUp />,
      path: '/rates',
      color: 'secondary',
    },
    {
      title: 'Settings',
      description: 'Customize your app preferences',
      icon: <Settings />,
      path: '/settings',
      color: 'info',
    },
  ];

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
      {/* Hero Section */}
      <Card sx={{ 
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'white',
        mb: 4,
        textAlign: 'center',
        py: 6
      }}>
        <CardContent>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            💱 Currency Converter
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
            Convert currencies with real-time exchange rates
          </Typography>
          
          {/* Server Status */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 3 }}>
            <Chip
              icon={<CheckCircle />}
              label={`Server: ${serverStatus === 'online' ? 'Online' : 'Offline'}`}
              color={serverStatus === 'online' ? 'success' : 'error'}
              variant="outlined"
              sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}
            />
            {currencyCount > 0 && (
              <Chip
                label={`${currencyCount} currencies available`}
                variant="outlined"
                sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}
              />
            )}
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/convert')}
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'grey.100',
              },
            }}
          >
            Start Converting
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
        Quick Actions
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={6} md={4} key={action.title}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
              }}
              onClick={() => navigate(action.path)}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Box sx={{ color: `${action.color}.main`, mb: 2 }}>
                  {React.cloneElement(action.icon, { sx: { fontSize: 48 } })}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Features */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
        Features
      </Typography>
      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent sx={{ py: 4 }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {React.cloneElement(feature.icon, { sx: { fontSize: 40 } })}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Server Status Alert */}
      {serverStatus === 'offline' && (
        <Alert severity="warning" sx={{ mt: 4 }}>
          Backend server is currently offline. Some features may not work properly.
        </Alert>
      )}
    </Container>
  );
};

export default Home;



