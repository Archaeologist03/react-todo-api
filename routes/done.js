const express = require('express');

const listController = require('../controllers/done');

const router = express.Router();

router.post('/adddone', listController.addDone);

router.post('/deletedone/:id', listController.deleteDone);

module.exports = router;
