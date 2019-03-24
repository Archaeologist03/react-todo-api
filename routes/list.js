const express = require('express');

const listController = require('../controllers/list');

const router = express.Router();

router.get('/', listController.getIndex);

router.post('/addtodo', listController.addTodo);

router.delete('/deletetodo/:id', listController.deleteTodo);

module.exports = router;
