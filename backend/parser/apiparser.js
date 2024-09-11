const axios = require('axios');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Загружаем переменные окружения из файла .env
dotenv.config();

// Создаем пул подключений к базе данных MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  insecureAuth: true
});

async function parseVacancies() {
  try {
    // Делаем запрос к API hh.ru
    const response = await axios.get('https://api.hh.ru/vacancies', {
      params: {
        area: 113, // Россия
        per_page: 100,
        text: 'программист OR разработчик OR программирование OR IT OR информационные технологии'
      }
    });

    // Получаем массив вакансий из ответа API
    const vacancies = response.data.items;

    // Формируем SQL-запрос для вставки вакансий в базу данных
    const query = 'INSERT INTO vacancies (title, url, salary_from, salary_to, currency, company_name, area_name, employment_type, profession_name) VALUES ?';

    // Создаем массив значений для SQL-запроса
    const values = vacancies.map((vacancy) => {
      return [
        vacancy.name,
        vacancy.alternate_url,
        vacancy.salary ? vacancy.salary.from : null,
        vacancy.salary ? vacancy.salary.to : null,
        vacancy.salary ? vacancy.salary.currency : null,
        vacancy.employer.name,
        vacancy.area.name,
        vacancy.employment ? vacancy.employment.name : null,
        'IT-профессии'
      ];
    });

    // Получаем подключение из пула
    const connection = await pool.getConnection();

    // Выполняем SQL-запрос для вставки вакансий в базу данных
    const result = await connection.query(query, [values]);
    console.log(`Inserted ${result[0].affectedRows} vacancies into MySQL database`);

    // Освобождаем подключение
    connection.release();

  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  parseVacancies,
};
