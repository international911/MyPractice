const express = require('express');
const vacanciesController = require('../controllers/vacanciesController');

const router = express.Router();

router.get('/vacancies', vacanciesController.getVacancies);

module.exports = router;
