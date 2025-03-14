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

// Константы для настройки запроса
const API_URL = 'https://api.hh.ru/vacancies';
const SEARCH_PARAMS = {
  area: 113, // Россия
  per_page: 100,
  text: 'программист OR разработчик OR программирование OR IT OR информационные технологии'
};

/**
 * Получает вакансии с API hh.ru.
 * @returns {Promise<Array>} Массив вакансий.
 */
async function fetchVacancies() {
  try {
    const response = await axios.get(API_URL, { params: SEARCH_PARAMS });
    return response.data.items;
  } catch (error) {
    console.error('Ошибка при получении вакансий:', error);
    throw error;
  }
}

/**
 * Преобразует данные вакансий в формат, подходящий для вставки в базу данных.
 * @param {Array} vacancies Массив вакансий.
 * @returns {Array} Массив значений для SQL-запроса.
 */
function mapVacanciesToValues(vacancies) {
  return vacancies.map(vacancy => [
    vacancy.name,
    vacancy.alternate_url,
    getSalaryValue(vacancy.salary, 'from'),
    getSalaryValue(vacancy.salary, 'to'),
    vacancy.salary ? vacancy.salary.currency : null,
    vacancy.employer.name,
    vacancy.area.name,
    vacancy.employment ? vacancy.employment.name : null,
    'IT-профессии'
  ]);
}

/**
 * Возвращает значение зарплаты или null, если его нет.
 * @param {Object} salary Объект с информацией о зарплате.
 * @param {string} key Ключ для извлечения значения ('from' или 'to').
 * @returns {number|null} Значение зарплаты или null.
 */
function getSalaryValue(salary, key) {
  return salary ? salary[key] : null;
}

/**
 * Вставляет вакансии в базу данных.
 * @param {Array} values Массив значений для SQL-запроса.
 */
async function insertVacanciesIntoDatabase(values) {
  const query = `
    INSERT INTO vacancies (
      title, url, salary_from, salary_to, currency,
      company_name, area_name, employment_type, profession_name
    ) VALUES ?
  `;
  const connection = await pool.getConnection();
  try {
    const result = await connection.query(query, [values]);
    console.log(`Inserted ${result[0].affectedRows} vacancies into MySQL database`);
  } finally {
    connection.release();
  }
}

/**
 * Основная функция для парсинга вакансий.
 */
async function parseVacancies() {
  try {
    const vacancies = await fetchVacancies();
    const values = mapVacanciesToValues(vacancies);
    await insertVacanciesIntoDatabase(values);
  } catch (error) {
    console.error('Ошибка при парсинге вакансий:', error);
    throw error;
  }
}

module.exports = {
  parseVacancies,
};
