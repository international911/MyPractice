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

async function getVacancies(req, res) {
  const connection = await pool.getConnection();
  try {
    // Получаем параметры запроса
    const { name, salary_from, salary_to, currency, company_name, area_name, employment_type } = req.query;

    // Формируем SQL-запрос с учетом параметров запроса
    let query = 'SELECT * FROM vacancies WHERE 1=1';
    const params = [];

    if (name) {
      query += ' AND title LIKE ?';
      params.push(`%${name}%`);
    }
    if (salary_from) {
      query += ' AND (salary_from >= ? OR salary_to >= ?)';
      params.push(salary_from, salary_from);
    }
    if (salary_to) {
      query += ' AND (salary_from <= ? OR salary_to <= ?)';
      params.push(salary_to, salary_to);
    }
    if (currency) {
      query += ' AND currency = ?';
      params.push(currency);
    }
    if (company_name) {
      query += ' AND company_name LIKE ?';
      params.push(`%${company_name}%`);
    }
    if (area_name) {
      query += ' AND area_name LIKE ?';
      params.push(`%${area_name}%`);
    }
    if (employment_type) {
      query += ' AND employment_type LIKE ?';
      params.push(`%${employment_type}%`);
    }

    // Выполняем SQL-запрос
    const [rows, fields] = await connection.query(query, params);

    // Случайный выбор 50 вакансий из полученных результатов
    const shuffledVacancies = rows.sort(() => 0.5 - Math.random());
    const selectedVacancies = shuffledVacancies.slice(0, 50);

    const vacancies = selectedVacancies.map((row) => ({
      title: row.title,
      url: row.url,
      salary_from: row.salary_from,
      salary_to: row.salary_to,
      currency: row.currency,
      company_name: row.company_name,
      area_name: row.area_name,
      employment_type: row.employment_type,
    }));

    res.json(vacancies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка при получении вакансий' });
  } finally {
    connection.release();
  }
}

module.exports = {
  getVacancies,
};
