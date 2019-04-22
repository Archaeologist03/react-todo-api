const express = require('express');

const listController = require('../controllers/done');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.post('/adddone', isAuth, listController.addDone);

router.delete('/deletedone/:id', isAuth, listController.deleteDone);

module.exports = router;
