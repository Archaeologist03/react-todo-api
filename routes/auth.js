const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

// LOAD USER (by id stored in ls)
router.get('/loaduser/:id', isAuth, authController.loadUser);

// LOGIN USER
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (!userDoc) {
            return Promise.reject('Email does not exist');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long'),
  ],
  authController.login,
);

// SIGNUP USER
router.post(
  '/signup',
  [
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Name field must not be empty'),
    body('email')
      .isEmail()
      .withMessage('Please enter valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('Email address already exists');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long'),
  ],

  authController.signup,
);

module.exports = router;
