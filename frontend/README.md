# 💱 Currency Converter Web App

A responsive, modern currency converter web application built with React and Material-UI. Perfect for students, travelers, and anyone who needs quick currency conversions.

## ✨ Features

- **Real-time Exchange Rates**: Live currency conversion with up-to-date rates
- **170+ Currencies**: Global coverage with major and minor currencies
- **Responsive Design**: Works perfectly on all devices (mobile, tablet, desktop)
- **Modern UI**: Beautiful Material-UI interface with smooth animations
- **Fast & Secure**: Reliable API with 99.9% uptime guarantee
- **Mobile-First**: Optimized for mobile devices and touch interactions

## 🚀 Live Demo

The app is ready for deployment on Netlify, Vercel, or any static hosting service.

## 📱 Screenshots

- **Home Page**: Welcome screen with quick actions and server status
- **Convert Page**: Currency conversion with amount input and currency selection
- **Rates Page**: View current exchange rates for all available currencies
- **Settings Page**: App information and server status monitoring

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **UI Framework**: Material-UI (MUI) 5.14.0
- **Routing**: React Router DOM 6.15.0
- **HTTP Client**: Axios 1.6.0
- **Build Tool**: Create React App 5.0.1

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd currency_converter/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment

### Netlify (Recommended)

1. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with your GitHub account
   - Click "New site from Git"

2. **Configure build settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Node version**: `18`

3. **Deploy**
   - Netlify will automatically build and deploy your site
   - You'll get a live URL like: `https://your-app-name.netlify.app`

### Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

### GitHub Pages

1. **Add homepage to package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name"
   }
   ```

2. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d build"
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

## 📱 Mobile Responsiveness

The app is fully responsive and works great on:
- **Mobile phones** (320px - 768px)
- **Tablets** (768px - 1024px)
- **Desktop** (1024px+)

### Mobile Features
- Touch-friendly interface
- Swipe gestures for navigation
- Optimized for thumb navigation
- Fast loading on mobile networks

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_API_KEY=your_api_key_here
```

### API Configuration

The app connects to a backend API for currency conversion. Update the API URL in `src/services/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
```

## 🎨 Customization

### Theme Colors

Modify the theme in `src/App.js`:

```javascript
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
  },
});
```

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.js`
3. Update the navigation in `src/components/Navbar.js`

## 🐛 Troubleshooting

### Build Issues
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`
- Check Node.js version: `node --version` (should be 16+)

### API Issues
- Check if backend server is running
- Verify API URL in configuration
- Check network connectivity

### Mobile Issues
- Test on different devices
- Check viewport meta tag
- Verify touch event handling

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions:
- Create an issue on GitHub
- Contact the developer
- Check the documentation

---

**Built with ❤️ for students and travelers worldwide**
