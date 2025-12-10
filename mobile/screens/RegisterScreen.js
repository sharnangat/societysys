import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Switch,
} from 'react-native';
import ApiService from '../services/api';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone: '',
    status: '',
    email_verified: false,
    phone_verified: false,
    failed_login_attempts: '',
    account_locked_until: '',
    password_reset_token: '',
    password_reset_expires: '',
    email_verification_token: '',
    email_verification_expires: '',
    last_login: '',
    last_login_ip: '',
    created_by: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    // Required fields validation
    if (!formData.username || !formData.email || !formData.password) {
      Alert.alert('Error', 'Username, email and password are required');
      return false;
    }

    // Username validation (matches users.js: STRING(50), min 3 chars)
    if (formData.username.length < 3) {
      Alert.alert('Error', 'Username must be at least 3 characters long');
      return false;
    }
    if (formData.username.length > 50) {
      Alert.alert('Error', 'Username must be 50 characters or less');
      return false;
    }

    // Email validation (matches users.js: STRING(255), unique)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    if (formData.email.length > 255) {
      Alert.alert('Error', 'Email must be 255 characters or less');
      return false;
    }

    // Password validation (matches users.js: min 6 chars)
    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }

    // Password confirmation
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    // First name validation (matches users.js: STRING(100))
    if (formData.first_name && formData.first_name.length > 100) {
      Alert.alert('Error', 'First name must be 100 characters or less');
      return false;
    }

    // Last name validation (matches users.js: STRING(100))
    if (formData.last_name && formData.last_name.length > 100) {
      Alert.alert('Error', 'Last name must be 100 characters or less');
      return false;
    }

    // Phone validation (matches users.js: STRING(15))
    if (formData.phone && formData.phone.length > 15) {
      Alert.alert('Error', 'Phone number must be 15 characters or less');
      return false;
    }

    // Status validation (matches users.js: STRING)
    if (formData.status && formData.status.length > 255) {
      Alert.alert('Error', 'Status must be 255 characters or less');
      return false;
    }

    // Created_by validation (matches users.js: UUID)
    if (formData.created_by && formData.created_by.trim() !== '') {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(formData.created_by.trim())) {
        Alert.alert('Error', 'Created By must be a valid UUID format');
        return false;
      }
    }

    // Failed login attempts validation (matches users.js: INTEGER)
    if (formData.failed_login_attempts && formData.failed_login_attempts.trim() !== '') {
      const attempts = parseInt(formData.failed_login_attempts);
      if (isNaN(attempts) || attempts < 0) {
        Alert.alert('Error', 'Failed login attempts must be a non-negative integer');
        return false;
      }
    }

    // Password reset token validation (matches users.js: STRING(255))
    if (formData.password_reset_token && formData.password_reset_token.length > 255) {
      Alert.alert('Error', 'Password reset token must be 255 characters or less');
      return false;
    }

    // Email verification token validation (matches users.js: STRING(255))
    if (formData.email_verification_token && formData.email_verification_token.length > 255) {
      Alert.alert('Error', 'Email verification token must be 255 characters or less');
      return false;
    }

    // Last login IP validation (matches users.js: STRING(45))
    if (formData.last_login_ip && formData.last_login_ip.length > 45) {
      Alert.alert('Error', 'Last login IP must be 45 characters or less');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name || undefined,
        last_name: formData.last_name || undefined,
        phone: formData.phone || undefined,
        status: formData.status || undefined,
        email_verified: formData.email_verified || undefined,
        phone_verified: formData.phone_verified || undefined,
        failed_login_attempts: formData.failed_login_attempts ? parseInt(formData.failed_login_attempts) : undefined,
        account_locked_until: formData.account_locked_until || undefined,
        password_reset_token: formData.password_reset_token || undefined,
        password_reset_expires: formData.password_reset_expires || undefined,
        email_verification_token: formData.email_verification_token || undefined,
        email_verification_expires: formData.email_verification_expires || undefined,
        last_login: formData.last_login || undefined,
        last_login_ip: formData.last_login_ip || undefined,
        created_by: formData.created_by.trim() || undefined,
      };

      const result = await ApiService.register(userData);

      if (result.success) {
        Alert.alert(
          'Success',
          'Account created successfully! Please check your email for verification.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Registration Failed', error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <Text style={styles.label}>Username *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username (3-50 characters)"
            value={formData.username}
            onChangeText={(value) => handleInputChange('username', value)}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={50}
          />

          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={255}
          />

          <Text style={styles.label}>Password *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password (min 6 characters)"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry
            autoCapitalize="none"
          />

          <Text style={styles.label}>Confirm Password *</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
            secureTextEntry
            autoCapitalize="none"
          />

          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name (max 100 characters)"
            value={formData.first_name}
            onChangeText={(value) => handleInputChange('first_name', value)}
            autoCapitalize="words"
            maxLength={100}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name (max 100 characters)"
            value={formData.last_name}
            onChangeText={(value) => handleInputChange('last_name', value)}
            autoCapitalize="words"
            maxLength={100}
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number (max 15 characters)"
            value={formData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            keyboardType="phone-pad"
            maxLength={15}
          />

          <Text style={styles.label}>Status</Text>
          <TextInput
            style={styles.input}
            placeholder="Account status (optional, default: pending_verification)"
            value={formData.status}
            onChangeText={(value) => handleInputChange('status', value)}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Created By (UUID)</Text>
          <TextInput
            style={styles.input}
            placeholder="UUID of user creating this account (optional)"
            value={formData.created_by}
            onChangeText={(value) => handleInputChange('created_by', value)}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Email Verified</Text>
            <Switch
              value={formData.email_verified}
              onValueChange={(value) => handleInputChange('email_verified', value)}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={formData.email_verified ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Phone Verified</Text>
            <Switch
              value={formData.phone_verified}
              onValueChange={(value) => handleInputChange('phone_verified', value)}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={formData.phone_verified ? '#fff' : '#f4f3f4'}
            />
          </View>

          <Text style={styles.label}>Failed Login Attempts</Text>
          <TextInput
            style={styles.input}
            placeholder="Number of failed login attempts (optional)"
            value={formData.failed_login_attempts}
            onChangeText={(value) => handleInputChange('failed_login_attempts', value)}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Account Locked Until</Text>
          <TextInput
            style={styles.input}
            placeholder="Date (YYYY-MM-DD HH:MM:SS) or ISO format (optional)"
            value={formData.account_locked_until}
            onChangeText={(value) => handleInputChange('account_locked_until', value)}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password Reset Token</Text>
          <TextInput
            style={styles.input}
            placeholder="Password reset token (max 255 characters, optional)"
            value={formData.password_reset_token}
            onChangeText={(value) => handleInputChange('password_reset_token', value)}
            autoCapitalize="none"
            maxLength={255}
          />

          <Text style={styles.label}>Password Reset Expires</Text>
          <TextInput
            style={styles.input}
            placeholder="Date (YYYY-MM-DD HH:MM:SS) or ISO format (optional)"
            value={formData.password_reset_expires}
            onChangeText={(value) => handleInputChange('password_reset_expires', value)}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Email Verification Token</Text>
          <TextInput
            style={styles.input}
            placeholder="Email verification token (max 255 characters, optional)"
            value={formData.email_verification_token}
            onChangeText={(value) => handleInputChange('email_verification_token', value)}
            autoCapitalize="none"
            maxLength={255}
          />

          <Text style={styles.label}>Email Verification Expires</Text>
          <TextInput
            style={styles.input}
            placeholder="Date (YYYY-MM-DD HH:MM:SS) or ISO format (optional)"
            value={formData.email_verification_expires}
            onChangeText={(value) => handleInputChange('email_verification_expires', value)}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Last Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Date (YYYY-MM-DD HH:MM:SS) or ISO format (optional)"
            value={formData.last_login}
            onChangeText={(value) => handleInputChange('last_login', value)}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Last Login IP</Text>
          <TextInput
            style={styles.input}
            placeholder="IP address (max 45 characters, optional)"
            value={formData.last_login_ip}
            onChangeText={(value) => handleInputChange('last_login_ip', value)}
            autoCapitalize="none"
            maxLength={45}
          />

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.linkText}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginTop: 15,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#4CAF50',
    fontSize: 16,
  },
});
