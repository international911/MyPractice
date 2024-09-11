const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const mysql = require('mysql2/promise'); // Используем mysql2/promise для работы с базой данных

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

// Проверяем подключение к базе данных
connection
  .then(() => {
    console.log('Успешное подключение к базе данных');
  })
  .catch((err) => {
    console.error('Ошибка подключения к базе данных: ', err);
  });

// Загрузка парсера
const parser = require('./parser/apiparser.js');
parser.parseVacancies();

// Загрузка роутинга
const vacanciesRouter = require('./router/vacanciesRouter');
app.use('/api', vacanciesRouter);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
