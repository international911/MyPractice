const axios = require('axios');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Загружаем переменные окружения из файла .env
dotenv.config();

// Создаем подключение к базе данных MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  insecureAuth: true
});

// Открываем подключение к базе данных
connection.connect((err) => {
  if (err) throw err;
  console.log('Успешный запуск');
});

// Функция для парсинга вакансий
async function parseVacancies() {
  // Делаем запрос к API hh.ru
  const response = await axios.get('https://api.hh.ru/vacancies', {
    params: {
      area: 113, // Россия
      per_page: 100,
      text: 'программист OR разработчик OR программирование OR IT OR информационные технологии' // Поиск вакансий с ключевыми словами, соответствующими IT-профессиям
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
      'IT-профессии' // Значение profession_name для всех вакансий
    ];
  });

  // Выполняем SQL-запрос для вставки вакансий в базу данных
  connection.query(query, [values], (err, result) => {
    if (err) throw err;
    console.log(`Inserted ${result.affectedRows} vacancies into MySQL database`);
  });
}

//функция для получения вакансий из базы данных
function getVacancies (perPage, maxPages, callback) {
  // Формируем SQL-запрос для получения вакансий из базы данных
  const query = `
    SELECT *
    FROM vacancies
    LIMIT ?, ?
  `;

  // Выполняем SQL-запрос для получения вакансий из базы данных
  connection.query(query, [perPage * (maxPages - 1), perPage], (err, results) => {
    if (err) throw err;

    // Преобразуем результаты в формат JSON
    const vacancies = results.map((vacancy) => {
      return {
        title: vacancy.title, 
        url: vacancy.url, 
        salary_from: vacancy.salary_from,
        salary_to: vacancy.salary_to, 
        currency: vacancy.currency,
        company_name: vacancy.company_name, 
        area_name: vacancy.area_name,
        profession_name: vacancy.profession_name,
        employment_type: vacancy.employment_type,
      };
    }); 

    // Возвращаем вакансии в формате JSON
    callback(vacancies);
  });
}

// Экспортируем функции parseVacancies и getVacancies
module.exports = {
parseVacancies, 
getVacancies
};