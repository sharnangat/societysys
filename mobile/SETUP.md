# React Native Mobile App Setup Guide

## Prerequisites

1. Node.js (v14 or higher)
2. npm or yarn
3. Expo CLI (will be installed automatically)
4. iOS Simulator (for Mac) or Android Emulator (for Windows/Mac/Linux)

## Installation Steps

### 1. Navigate to Mobile Directory

```bash
cd mobile
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies (CORS)

Make sure the backend has CORS enabled. The server.js has been updated to include CORS support.

```bash
# From project root
npm install cors
```

### 4. Start the Backend Server

From the project root directory:

```bash
node server.js
```

The server should be running on `http://localhost:3000`

### 5. Configure API URL (if needed)

If you're using a physical device or need to change the API URL, edit `mobile/services/api.js`:

- **iOS Simulator**: `http://localhost:3000/api` (default)
- **Android Emulator**: `http://10.0.2.2:3000/api` (default)
- **Physical Device**: Replace with your computer's IP address (e.g., `http://192.168.1.100:3000/api`)

To find your computer's IP:
- **Windows**: Run `ipconfig` in Command Prompt, look for IPv4 Address
- **Mac/Linux**: Run `ifconfig` or `ip addr`, look for inet address

### 6. Start the Expo Development Server

From the `mobile` directory:

```bash
npm start
```

This will open Expo DevTools in your browser.

### 7. Run on Simulator/Emulator

**For iOS (Mac only):**
```bash
npm run ios
```

**For Android:**
```bash
npm run android
```

Or scan the QR code with Expo Go app on your physical device.

## Testing the App

1. **Welcome Screen**: You'll see the starting screen with "Create Account" and "Sign In" buttons
2. **Register**: Tap "Create Account" to register a new user
3. **Login**: Tap "Sign In" to login with existing credentials

## Troubleshooting

### Connection Issues

If you can't connect to the backend:

1. **Check if backend is running**: Make sure `node server.js` is running
2. **Check API URL**: Verify the API_BASE_URL in `services/api.js` matches your environment
3. **Check CORS**: Ensure CORS is enabled in `server.js`
4. **Check Firewall**: Make sure your firewall allows connections on port 3000
5. **Physical Device**: Use your computer's IP address instead of localhost

### Common Errors

- **Network request failed**: Check API URL and ensure backend is running
- **CORS error**: Make sure CORS middleware is added to server.js
- **Module not found**: Run `npm install` again

## Project Structure

```
mobile/
├── App.js                    # Main app with navigation
├── screens/
│   ├── WelcomeScreen.js      # Starting screen
│   ├── RegisterScreen.js     # Registration form
│   └── LoginScreen.js         # Login form
├── services/
│   └── api.js                # API service for backend calls
├── package.json              # Dependencies
└── app.json                  # Expo configuration
```

## Features

- ✅ Welcome/Starting screen
- ✅ User registration with validation
- ✅ User login with token storage
- ✅ Navigation between screens
- ✅ Error handling and user feedback
- ✅ Loading states
- ✅ Form validation

