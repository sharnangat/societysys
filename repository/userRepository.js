const User = require('../models/users');

const createUser = (data) => User.create(data);
const getUsers = () => User.findAll();
const getUserById = (id) => User.findByPk(id);
const findByEmail = (email) => User.findOne({ where: { email } });
const updateUser = async (id, data) => {
  await User.update(data, { where: { id } });
  return User.findByPk(id);
};
const deleteUser = (id) => User.destroy({ where: { id } });

module.exports = { createUser, getUsers, getUserById, findByEmail, updateUser, deleteUser };
