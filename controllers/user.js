/* eslint-disable consistent-return, newline-per-chained-call, object-curly-newline */
const bcrypt = require('bcryptjs');
const PasswordValidator = require('password-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../middlewares/errors/not-found-err');
const Conflict = require('../middlewares/errors/conflict-err');
const Unauthorized = require('../middlewares/errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;
const passwordValidatorSchema = new PasswordValidator();

passwordValidatorSchema
  .is().min(8)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().not().spaces();

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  if (!passwordValidatorSchema.validate(password)) {
    throw new Unauthorized('пароль должен быть не менее 8 символов, содержать заглавные и строчные буквы, цифры');
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then(() => res.send({ email, name, about, avatar }))
    .catch((err) => {
      if (err.code === 11000) {
        throw new Conflict('Этот email уже используется');
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch(next);
};
/* eslint-disable consistent-return, newline-per-chained-call, object-curly-newline */
