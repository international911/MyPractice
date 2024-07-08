const parser = require('../parser/apiparser');

// Определяем контроллер для получения вакансий
exports.getVacancies = async (req, res) => {
  // Извлекаем параметры запроса
  const perPage = req.query.perPage || 10;
  const maxPages = req.query.maxPages || 1;

  try {
    // Получаем вакансии из сервиса parser
    parser.getVacancies(perPage, maxPages, (vacancies) => {
      // Формируем массив с результатами
      const result = vacancies.map((vacancy) => {
        return {
          title: vacancy.title,
          url: vacancy.url, // Добавляем ссылку на вакансию
          salary_from: vacancy.salary_from,
          salary_to: vacancy.salary_to,
          currency: vacancy.currency,
          company_name: vacancy.company_name,
          area_name: vacancy.area_name,
          profession_name: vacancy.profession_name,
          employment_type: vacancy.employment_type,
        };
      });

      // Возвращаем результаты в формате JSON
      res.json(result);
    });
  } catch (error) {
    // В случае ошибки возвращаем статус 500 и сообщение об ошибке
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка при получении вакансий' });
  }
};
