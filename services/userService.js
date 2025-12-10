const userRepository = require('../repository/userRepository');
const logger = require('../config/logger');

// Helper function to validate UUID format
const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

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

// Helper function to sanitize UUID fields
const sanitizeUUIDFields = (data) => {
  const uuidFields = ['created_by', 'id'];
  
  const sanitized = { ...data };
  
  uuidFields.forEach((field) => {
    if (sanitized[field] !== undefined && sanitized[field] !== null) {
      // Convert to string if not already
      const uuidValue = String(sanitized[field]).trim();
      
      // Remove empty strings or invalid UUIDs
      if (uuidValue === '' || !isValidUUID(uuidValue)) {
        logger.warn(`Removing invalid UUID field: ${field}`, { value: sanitized[field] });
        delete sanitized[field];
      } else {
        sanitized[field] = uuidValue;
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
  // Sanitize date and UUID fields before creating user
  let sanitizedData = sanitizeDateFields(data);
  sanitizedData = sanitizeUUIDFields(sanitizedData);
  // Remove 'id' field if present (let database generate it)
  delete sanitizedData.id;
  return userRepository.createUser(sanitizedData);
};
const getUsers = async () => userRepository.getUsers();
const getUserById = async (id) => {
  const user1 = await userRepository.getUserById(id);
  if (!user1) throw new Error('User not found');
  return user1;
};
const updateUser = async (id, data) => {
  // Sanitize date and UUID fields before updating user
  let sanitizedData = sanitizeDateFields(data);
  sanitizedData = sanitizeUUIDFields(sanitizedData);
  // Don't allow updating the id field
  delete sanitizedData.id;
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
