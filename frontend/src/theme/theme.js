import { DefaultTheme } from 'react-native-paper';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#8B2635', // Merlot/Wine
    primaryDark: '#6B1F2A',
    primaryLight: '#B84A5A',
    secondary: '#C17817', // Gold accent
    secondaryDark: '#9A5F12',
    secondaryLight: '#D4A574',
    accent: '#D4A574', // Warm accent
    background: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceVariant: '#F8F9FA',
    error: '#DC3545',
    warning: '#FFC107',
    success: '#28A745',
    info: '#17A2B8',
    text: '#2C1810', // Dark brown text
    textSecondary: '#6C757D',
    textDisabled: '#ADB5BD',
    outline: '#E9ECEF',
    disabled: '#DEE2E6',
    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(139, 38, 53, 0.1)',
    // Gradient colors
    gradientStart: '#8B2635', // Merlot
    gradientEnd: '#6B1F2A', // Darker merlot
    gradientSecondaryStart: '#C17817', // Gold
    gradientSecondaryEnd: '#D4A574', // Light gold
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 50,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6.27,
      elevation: 5,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10.32,
      elevation: 8,
    },
  },
};

export const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#B84A5A', // Lighter merlot for dark mode
    primaryDark: '#8B2635',
    primaryLight: '#D4A574',
    secondary: '#D4A574', // Gold accent
    secondaryDark: '#C17817',
    secondaryLight: '#E6C89C',
    accent: '#E6C89C', // Light accent
    background: '#1A1A1A', // Dark background
    surface: '#2D2D2D', // Dark surface
    surfaceVariant: '#3A3A3A',
    error: '#FF6B6B',
    warning: '#FFD93D',
    success: '#6BCF7F',
    info: '#4ECDC4',
    text: '#FFFFFF', // White text
    textSecondary: '#B0B0B0',
    textDisabled: '#666666',
    outline: '#404040',
    disabled: '#555555',
    overlay: 'rgba(0, 0, 0, 0.7)',
    shadow: 'rgba(0, 0, 0, 0.3)',
    // Gradient colors
    gradientStart: '#2D2D2D', // Dark surface
    gradientEnd: '#1A1A1A', // Dark background
    gradientSecondaryStart: '#B84A5A', // Merlot
    gradientSecondaryEnd: '#8B2635', // Darker merlot
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 50,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6.27,
      elevation: 5,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10.32,
      elevation: 8,
    },
  },
};

// Default theme export for backward compatibility
export const theme = lightTheme;

