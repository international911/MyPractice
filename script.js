const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

new Promise((resolve, reject) => {
  connection.connect((err) => {
    if (err) {
      return reject(err);
    }
    resolve(connection);
  });
})
.then((conn) => {
  console.log('Успех');
})
.catch((err) => {
  console.error('Ошибка: ', err);
});

