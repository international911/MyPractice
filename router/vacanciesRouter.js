const express = require('express');
const router = express.Router();
const vacanciesController = require('../controller/vacanciesController');

router.get('/', (req, res) => {
  vacanciesController.getVacancies(req, res);
});

module.exports = router;
