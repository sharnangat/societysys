const userService = require('../services/userService');
const logger = require('../config/logger');

const createUser = async (req, res) => {
  try {
    logger.info('Creating new user', { email: req.body.email });
    const user = await userService.createUser(req.body);
    logger.info('User created successfully', { userId: user.id, email: user.email });
    res.status(201).json(user);
  } catch (err) {
    logger.warn('Failed to create user', { error: err.message, email: req.body.email });
    // If user already exists, surface a conflict status; otherwise fall back to bad request.
    const status = err.message === 'User already exists with this email' ? 409 : 400;
    res.status(status).json({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    logger.info('Fetching all users');
    const users = await userService.getUsers();
    logger.info('Users fetched successfully', { count: users.length });
    res.json(users);
  } catch (err) {
    logger.error('Failed to fetch users', { error: err.message, stack: err.stack });
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    logger.info('Fetching user by ID', { userId: req.params.id });
    const user = await userService.getUserById(req.params.id);
    logger.info('User fetched successfully', { userId: user.id });
    res.json(user);
  } catch (err) {
    logger.warn('User not found', { userId: req.params.id, error: err.message });
    res.status(404).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    logger.info('Updating user', { userId: req.params.id });
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    logger.info('User updated successfully', { userId: updatedUser.id });
    res.json(updatedUser);
  } catch (err) {
    logger.warn('Failed to update user', { userId: req.params.id, error: err.message });
    res.status(404).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    logger.info('Deleting user', { userId: req.params.id });
    const result = await userService.deleteUser(req.params.id);
    logger.info('User deleted successfully', { userId: req.params.id });
    res.json(result);
  } catch (err) {
    logger.warn('Failed to delete user', { userId: req.params.id, error: err.message });
    res.status(404).json({ message: err.message });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
