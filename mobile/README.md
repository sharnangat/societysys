# Society System Mobile App

React Native mobile application for the Society System platform.

## Features

- Welcome/Starting screen
- User Registration with all fields from users.js model
- User Login
- API integration with Node.js backend
- Form validation matching database constraints

## Setup

1. Install dependencies:
```bash
cd mobile
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
│   ├── RegisterScreen.js  # User registration screen (matches users.js model)
│   └── LoginScreen.js     # User login screen
├── services/
│   └── api.js             # API service for backend calls
├── package.json           # Dependencies
├── app.json               # Expo configuration
└── babel.config.js        # Babel configuration
```

## Registration Form Fields

The registration form includes all user-editable fields from the users.js model:

- **Username*** (required, 3-50 characters)
- **Email*** (required, max 255 characters, unique)
- **Password*** (required, min 6 characters)
- **Confirm Password*** (validation only)
- **First Name** (optional, max 100 characters)
- **Last Name** (optional, max 100 characters)
- **Phone** (optional, max 15 characters)

All fields have proper validation matching the database model constraints.

## Navigation Flow

1. Welcome Screen → Register Screen
2. Welcome Screen → Login Screen
3. Register Screen → Login Screen (after successful registration)
4. Login Screen → Register Screen (if user doesn't have account)

## Backend Requirements

Make sure your Node.js backend:
- Has CORS enabled (already configured in server.js)
- Is running on port 3000
- Has the `/api/users` (POST) endpoint for registration
- Has the `/api/login` (POST) endpoint for login
