import React, { useState } from 'react';
import styles from '../styles/VacancyList.module.scss';

const VacancyList = ({ vacancies }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const vacanciesPerPage = 10;

  const indexOfLastVacancy = currentPage * vacanciesPerPage;
  const indexOfFirstVacancy = indexOfLastVacancy - vacanciesPerPage;
  const currentVacancies = vacancies.slice(indexOfFirstVacancy, indexOfLastVacancy);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <ul className={styles.vacancyList}>
        {currentVacancies.map((vacancy, index) => (
          <li key={index} className={styles.vacancyItem}>
            <a href={vacancy.url} target="_blank" rel="noopener noreferrer">
              <h2>{vacancy.title}</h2>
            </a>
            <p>{vacancy.company_name}</p>
            <p>{vacancy.area_name}</p>
            <p>{vacancy.salary_from} - {vacancy.salary_to} {vacancy.currency}</p>
            <p>{vacancy.employment_type}</p>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        {[...Array(Math.ceil(vacancies.length / vacanciesPerPage)).keys()].map((number) => (
          <button key={number} onClick={() => paginate(number + 1)} className={styles.paginationButton}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VacancyList;