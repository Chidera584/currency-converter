# 💱 Currency Converter App

A beautiful, mobile-responsive currency converter application built with **React Native** and **Express.js**. Convert between 170+ world currencies with real-time exchange rates and a stunning user interface.

## ✨ Features

- **Real-time Exchange Rates**: Get up-to-date currency conversion rates
- **170+ Currencies**: Support for major world currencies
- **Beautiful UI/UX**: Modern, intuitive design with smooth animations
- **Mobile Responsive**: Optimized for both Android and iOS devices
- **Offline Support**: Basic offline functionality
- **Server Status Monitoring**: Real-time backend health checks
- **Cross-platform**: Works on mobile, tablet, and web

## 🏗️ Architecture

- **Frontend**: React Native with Expo
- **Backend**: Express.js REST API
- **Currency Data**: External API integration
- **State Management**: React Hooks
- **Styling**: React Native Paper + Custom Theme
- **Navigation**: React Navigation v6

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd currency_converter
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cd backend
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start the backend server**
   ```bash
   npm run server
   # Backend will run on http://localhost:5000
   ```

5. **Start the frontend app**
   ```bash
   cd frontend
   npm start
   # Expo will open in your browser
   ```

### Running the App

- **Web**: Press `w` in the Expo terminal
- **Android**: Press `a` in the Expo terminal (requires Android emulator)
- **iOS**: Press `i` in the Expo terminal (macOS only, requires Xcode)

## 📱 App Screens

### 1. Home Screen
- Welcome message and app overview
- Server status indicator
- Quick action buttons
- Feature highlights

### 2. Convert Screen
- Currency conversion form
- Amount input with validation
- Currency selection (From/To)
- Real-time conversion results
- Popular currency shortcuts

### 3. Rates Screen
- Current exchange rates
- Base currency selection
- Rate comparison view
- Currency filtering

### 4. Settings Screen
- App preferences
- Server status monitoring
- About information
- Support and legal links

## 🔧 Configuration

### Backend Configuration

The backend uses environment variables for configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Currency API Configuration
CURRENCY_API_KEY=your_api_key_here
CURRENCY_API_BASE_URL=https://api.exchangerate-api.com/v4

# Security
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Configuration

The frontend is configured through the theme system in `frontend/src/theme/theme.js`:

- Color scheme
- Typography
- Spacing
- Shadows and borders

## 🌐 API Endpoints

### Currency Conversion
- `GET /api/convert?from=USD&to=EUR&amount=100`
- Converts between currencies

### Available Currencies
- `GET /api/currencies`
- Returns list of supported currencies

### Exchange Rates
- `GET /api/rates/USD`
- Returns exchange rates for a base currency

### Health Check
- `GET /api/health`
- Server status endpoint

## 🎨 Customization

### Theme Customization

Edit `frontend/src/theme/theme.js` to customize:

```javascript
export const theme = {
  colors: {
    primary: '#6366F1',      // Main brand color
    secondary: '#10B981',    // Secondary color
    background: '#F8FAFC',   // Background color
    // ... more colors
  },
  spacing: {
    xs: 4, sm: 8, md: 16,   // Spacing scale
    lg: 24, xl: 32, xxl: 48
  }
  // ... more theme options
};
```

### Adding New Screens

1. Create a new screen component in `frontend/src/screens/`
2. Add navigation in `frontend/App.js`
3. Update the tab navigator if needed

## 📦 Project Structure

```
currency_converter/
├── backend/                 # Express.js server
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── env.example         # Environment variables template
├── frontend/               # React Native app
│   ├── src/
│   │   ├── screens/        # App screens
│   │   ├── services/       # API services
│   │   └── theme/          # UI theme configuration
│   ├── App.js              # Main app component
│   ├── package.json        # Frontend dependencies
│   └── app.json            # Expo configuration
├── package.json            # Root package.json
└── README.md               # This file
```

## 🚀 Deployment

### Backend Deployment

1. **Heroku**
   ```bash
   cd backend
   heroku create your-app-name
   git push heroku main
   ```

2. **Vercel**
   ```bash
   cd backend
   vercel --prod
   ```

3. **Docker**
   ```bash
   docker build -t currency-converter-backend .
   docker run -p 5000:5000 currency-converter-backend
   ```

### Frontend Deployment

1. **Expo Build**
   ```bash
   cd frontend
   expo build:android
   expo build:ios
   ```

2. **Web Deployment**
   ```bash
   cd frontend
   expo build:web
   # Deploy the web-build folder to your hosting service
   ```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) - React Native development platform
- [React Native Paper](https://callstack.github.io/react-native-paper/) - Material Design components
- [Exchange Rate API](https://exchangerate-api.com/) - Currency data provider
- [React Navigation](https://reactnavigation.org/) - Navigation library

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/currency_converter/issues)
- **Email**: support@currencyconverter.com
- **Documentation**: [Wiki](https://github.com/yourusername/currency_converter/wiki)

---

**Built with ❤️ using React Native & Express.js**

*Last updated: December 2024*

