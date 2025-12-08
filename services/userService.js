const userRepository = require('../repository/userRepository');

const createUser = async (data) => {
  const existingUser = await userRepository.findByEmail(data.email);
  if (existingUser) {
    throw new Error('User already exists with this email');
  }
  return userRepository.createUser(data);
};
const getUsers = async () => userRepository.getUsers();
const getUserById = async (id) => {
  const user1 = await userRepository.getUserById(id);
  if (!user1) throw new Error('User not found');
  return user1;
};
const updateUser = async (id, data) => {
  const updatedUser = await userRepository.updateUser(id, data);
  if (!updatedUser) throw new Error('User not found');
  return updatedUser;
};
const deleteUser = async (id) => {
  const deleted = await userRepository.deleteUser(id);
  if (!deleted) throw new Error('User not found');
  return { message: 'User deleted successfully' };
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
