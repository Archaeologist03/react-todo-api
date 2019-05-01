const express = require('express');
const { body } = require('express-validator/check');

const listController = require('../controllers/list');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.post(
  '/addtodo',
  [
    body('newTodo.name')
      .trim()
      .not()
      .isEmpty(),
  ],
  isAuth,
  listController.addTodo,
);

router.delete('/deletetodo/:id', isAuth, listController.deleteTodo);

module.exports = router;
