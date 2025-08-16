import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Alert,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  CheckCircle,
  Error,
  Info,
  Refresh,
  CurrencyExchange,
  Code,
  School,
} from '@mui/icons-material';
import { checkHealth } from '../services/api';

const Settings = () => {
  const theme = useTheme();
  const [serverStatus, setServerStatus] = useState('unknown');
  const [checking, setChecking] = useState(false);

  const checkServerStatus = async () => {
    try {
      setChecking(true);
      await checkHealth();
      setServerStatus('online');
    } catch (error) {
      setServerStatus('offline');
    } finally {
      setChecking(false);
    }
  };

  const getStatusColor = () => {
    switch (serverStatus) {
      case 'online':
        return 'success';
      case 'offline':
        return 'error';
      default:
        return 'warning';
    }
  };

  const getStatusText = () => {
    switch (serverStatus) {
      case 'online':
        return 'Online';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Server Status */}
        {/* <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Server Status
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Chip
                  icon={serverStatus === 'online' ? <CheckCircle /> : <Error />}
                  label={getStatusText()}
                  color={getStatusColor()}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={checkServerStatus}
                  disabled={checking}
                  startIcon={<Refresh />}
                >
                  Check
                </Button>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Backend server status for currency conversion features.
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}

        {/* App Info */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                App Information
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CurrencyExchange />
                  </ListItemIcon>
                  <ListItemText
                    primary="Currency Converter"
                    secondary="Version 1.0.0"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Code />
                  </ListItemIcon>
                  <ListItemText
                    primary="Built with"
                    secondary="React + Material-UI"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <School />
                  </ListItemIcon>
                  <ListItemText
                    primary="Developer"
                    secondary="Student Project"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Features */}
        {/* <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Features
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="subtitle1">Real-time Rates</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Live exchange rates
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="subtitle1">170+ Currencies</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Global coverage
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="subtitle1">Responsive Design</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Works on all devices
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="subtitle1">Fast & Secure</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Reliable API
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid> */}

        {/* About */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Typography variant="body1" paragraph>
                This is a responsive currency converter web application built with React and Material-UI. 
                It provides real-time currency conversion with a beautiful, mobile-friendly interface.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Perfect for students, travelers, and anyone who needs quick currency conversions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {serverStatus === 'offline' && (
        <Alert severity="warning" sx={{ mt: 3 }}>
          Backend server is offline. Currency conversion features may not work properly.
        </Alert>
      )}
    </Container>
  );
};

export default Settings;
