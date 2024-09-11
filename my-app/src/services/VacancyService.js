import axios from 'axios';

const API_URL = 'http://localhost:5000/api/vacancies';

const VacancyService = {
  searchVacancies: async (query) => {
    const response = await axios.get(API_URL, { params: { name: query } });
    return response.data;
  },
};

export default VacancyService;