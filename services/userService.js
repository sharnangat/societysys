const userRepository = require('../repository/userRepository');
const logger = require('../config/logger');

// Helper function to sanitize date fields
const sanitizeDateFields = (data) => {
  const dateFields = [
    'account_locked_until',
    'password_reset_expires',
    'email_verification_expires',
    'last_login',
  ];
  
  const sanitized = { ...data };
  
  dateFields.forEach((field) => {
    if (sanitized[field] !== undefined && sanitized[field] !== null) {
      // If it's already a Date object, keep it
      if (sanitized[field] instanceof Date) {
        return;
      }
      
      // If it's a string, try to parse it
      if (typeof sanitized[field] === 'string') {
        const parsedDate = new Date(sanitized[field]);
        // Check if the date is valid
        if (isNaN(parsedDate.getTime()) || sanitized[field].toLowerCase() === 'invalid date') {
          // Remove invalid date fields
          logger.warn(`Removing invalid date field: ${field}`, { value: sanitized[field] });
          delete sanitized[field];
        } else {
          sanitized[field] = parsedDate;
        }
      } else {
        // For other types, remove the field
        logger.warn(`Removing non-date value from date field: ${field}`, { value: sanitized[field], type: typeof sanitized[field] });
        delete sanitized[field];
      }
    }
  });
  
  return sanitized;
};

const createUser = async (data) => {
  const existingUser = await userRepository.findByEmail(data.email);
  if (existingUser) {
    throw new Error('User already exists with this email');
  }
  // Sanitize date fields before creating user
  const sanitizedData = sanitizeDateFields(data);
  return userRepository.createUser(sanitizedData);
};
const getUsers = async () => userRepository.getUsers();
const getUserById = async (id) => {
  const user1 = await userRepository.getUserById(id);
  if (!user1) throw new Error('User not found');
  return user1;
};
const updateUser = async (id, data) => {
  // Sanitize date fields before updating user
  const sanitizedData = sanitizeDateFields(data);
  const updatedUser = await userRepository.updateUser(id, sanitizedData);
  if (!updatedUser) throw new Error('User not found');
  return updatedUser;
};
const deleteUser = async (id) => {
  const deleted = await userRepository.deleteUser(id);
  if (!deleted) throw new Error('User not found');
  return { message: 'User deleted successfully' };
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
