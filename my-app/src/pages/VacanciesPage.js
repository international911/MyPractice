import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import VacancyService from '../services/VacancyService';
import VacancyList from '../components/VacancyList';
import VacancyFilter from '../components/VacancyFilter';
import styles from '../styles/VacanciesPage.module.scss';

const VacanciesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const [vacancies, setVacancies] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (query) {
      VacancyService.searchVacancies(query).then((data) => {
        setVacancies(data);
        setFilteredVacancies(data);
      });
    }
  }, [query]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const filtered = vacancies.filter((vacancy) => {
      return Object.keys(newFilters).every((key) => {
        if (!newFilters[key]) return true;
        return vacancy[key] === newFilters[key];
      });
    });
    setFilteredVacancies(filtered);
  };

  return (
    <div className={styles.vacanciesPage}>
      <div className={styles.filterSection}>
        <VacancyFilter onFilterChange={handleFilterChange} />
      </div>
      <div className={styles.vacancyList}>
        <VacancyList vacancies={filteredVacancies} />
      </div>
    </div>
  );
};

export default VacanciesPage;