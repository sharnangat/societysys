const User = require('../models/users');

const createUser = (data) => User.create(data);
const getUsers = () => User.findAll();
const getUserById = (id) => User.findByPk(id);
const findByEmail = (email) => User.findOne({ where: { email } });
const updateUser = (id, data) => User.update(data, { where: { id }, returning: true });
const deleteUser = (id) => User.destroy({ where: { id } });

module.exports = { createUser, getUsers, getUserById, findByEmail, updateUser, deleteUser };
