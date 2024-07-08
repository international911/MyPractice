const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const mysql = require('mysql2');

dotenv.config();
const jsonParser = bodyParser.json();
const app = express();

app.use(cors());
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));

// Загрузка базы данных
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  insecureAuth: true,
});

// Загрузка парсера
const parser = require('./parser/apiparser.js');
parser.parseVacancies();
// Загрузка роутинга
const vacanciesRouter = require('./router/vacanciesRouter.js');

app.use('/vacancies', vacanciesRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
