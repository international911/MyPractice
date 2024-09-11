const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection
  .then(() => {
    console.log('Успех');
  })
  .catch((err) => {
    console.error('Ошибка: ', err);
  });
