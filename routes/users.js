const users = require('express').Router();
const { getUsers, getUser } = require('../controllers/user');
const { userIdValidation } = require('../middlewares/validation');

users.get('/', getUsers);

users.get('/:id', userIdValidation, getUser);

module.exports = users;
