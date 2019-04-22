const express = require('express');

const listController = require('../controllers/list');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/', isAuth, listController.getIndex);

router.post('/addtodo', isAuth, listController.addTodo);

router.delete('/deletetodo/:id', isAuth, listController.deleteTodo);

module.exports = router;
