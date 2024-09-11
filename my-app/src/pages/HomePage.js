import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/HomePage.module.scss';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/vacancies?query=${query}`);
  };

  return (
    <div className={styles.homePage}>
      <h1>Главная</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите название вакансии"
        className={styles.searchInput}
      />
      <button onClick={handleSearch} className={styles.searchButton}>Найти</button>
    </div>
  );
};

export default HomePage;