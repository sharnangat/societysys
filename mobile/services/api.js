import { Platform } from 'react-native';

// API Configuration
// Update this URL based on your environment:
// - iOS Simulator: 'http://localhost:3000/api'
// - Android Emulator: 'http://10.0.2.2:3000/api'
// - Physical Device: 'http://YOUR_COMPUTER_IP:3000/api' (e.g., 'http://192.168.1.100:3000/api')
const API_BASE_URL = Platform.select({
  ios: 'http://localhost:3000/api',
  android: 'http://10.0.2.2:3000/api',
  default: 'http://localhost:3000/api',
});

/**
 * API Service for making HTTP requests to the backend
 */
class ApiService {
  /**
   * Make a POST request to register a new user
   * @param {Object} userData - User registration data matching the users.js model
   * @param {string} userData.username - User username (required, min 3 characters, max 50)
   * @param {string} userData.email - User email (required, unique, max 255)
   * @param {string} userData.password - User password (required, min 6 characters)
   * @param {string} [userData.first_name] - User first name (optional, max 100)
   * @param {string} [userData.last_name] - User last name (optional, max 100)
   * @param {string} [userData.phone] - User phone number (optional, max 15)
   * @param {string} [userData.status] - Account status (optional, default: 'pending_verification')
   * @param {boolean} [userData.email_verified] - Email verification status (optional, default: false)
   * @param {boolean} [userData.phone_verified] - Phone verification status (optional, default: false)
   * @param {number} [userData.failed_login_attempts] - Failed login attempts count (optional, default: 0)
   * @param {string} [userData.account_locked_until] - Account lock expiration date (optional)
   * @param {string} [userData.password_reset_token] - Password reset token (optional, max 255)
   * @param {string} [userData.password_reset_expires] - Password reset expiration date (optional)
   * @param {string} [userData.email_verification_token] - Email verification token (optional, max 255)
   * @param {string} [userData.email_verification_expires] - Email verification expiration date (optional)
   * @param {string} [userData.last_login] - Last login date (optional)
   * @param {string} [userData.last_login_ip] - Last login IP address (optional, max 45)
   * @param {string} [userData.created_by] - UUID of user creating this account (optional)
   * @returns {Promise<Object>} Response data
   */
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return { success: true, data };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Make a POST request to login a user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Response data with user and token
   */
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return { success: true, data };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}

export default new ApiService();
