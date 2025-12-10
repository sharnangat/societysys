# Society System Mobile App

React Native mobile application for the Society System platform.

## Features

- Welcome/Starting screen
- User Registration
- User Login
- API integration with Node.js backend

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npm start
```

3. Run on iOS simulator:
```bash
npm run ios
```

4. Run on Android emulator:
```bash
npm run android
```

## API Configuration

The app connects to the Node.js backend API. Update the `API_BASE_URL` in `services/api.js`:

- For iOS Simulator: `http://localhost:3000/api`
- For Android Emulator: `http://10.0.2.2:3000/api`
- For Physical Device: Use your computer's IP address (e.g., `http://192.168.1.100:3000/api`)

## Project Structure

```
mobile/
├── App.js                 # Main app component with navigation
├── screens/
│   ├── WelcomeScreen.js   # Starting/welcome screen
│   ├── RegisterScreen.js  # User registration screen
│   └── LoginScreen.js     # User login screen
├── services/
│   └── api.js             # API service for backend calls
└── package.json           # Dependencies
```

## Navigation Flow

1. Welcome Screen → Register Screen
2. Welcome Screen → Login Screen
3. Register Screen → Login Screen (after successful registration)
4. Login Screen → Register Screen (if user doesn't have account)

