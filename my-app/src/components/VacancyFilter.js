import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/VacancyFilter.module.scss';

const cities = [
  'Абакан', 'Анадырь', 'Архангельск', 'Астрахань', 'Барнаул', 'Белгород', 'Биробиджан', 'Благовещенск',
  'Брянск', 'Владивосток', 'Владикавказ', 'Владимир', 'Волгоград', 'Вологда', 'Воронеж', 'Горно-Алтайск',
  'Грозный', 'Екатеринбург', 'Иваново', 'Ижевск', 'Иркутск', 'Йошкар-Ола', 'Казань', 'Калининград',
  'Калуга', 'Кемерово', 'Киров', 'Кострома', 'Краснодар', 'Красноярск', 'Курган', 'Курск', 'Кызыл',
  'Липецк', 'Магадан', 'Магас', 'Майкоп', 'Махачкала', 'Москва', 'Мурманск', 'Нальчик', 'Нарьян-Мар',
  'Нижний Новгород', 'Новосибирск', 'Омск', 'Оренбург', 'Орёл', 'Пенза', 'Пермь', 'Петрозаводск',
  'Петропавловск-Камчатский', 'Псков', 'Ростов-на-Дону', 'Рязань', 'Салехард', 'Самара', 'Санкт-Петербург',
  'Саранск', 'Саратов', 'Симферополь', 'Смоленск', 'Ставрополь', 'Сыктывкар', 'Тамбов', 'Тверь', 'Томск',
  'Тула', 'Тюмень', 'Улан-Удэ', 'Ульяновск', 'Уфа', 'Хабаровск', 'Ханты-Мансийск', 'Чебоксары', 'Челябинск',
  'Черкесск', 'Чита', 'Элиста', 'Южно-Сахалинск', 'Якутск', 'Ярославль'
];

const employmentTypes = ['Стажировка', 'Частичная занятость', 'Полная занятость'];

const VacancyFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({});
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showEmploymentDropdown, setShowEmploymentDropdown] = useState(false);
  const cityDropdownRef = useRef(null);
  const employmentDropdownRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    onFilterChange({ ...filters, [name]: value });
  };

  const handleCitySelect = (city) => {
    setFilters({ ...filters, area_name: city });
    onFilterChange({ ...filters, area_name: city });
    setShowCityDropdown(false);
  };

  const handleEmploymentSelect = (type) => {
    setFilters({ ...filters, employment_type: type });
    onFilterChange({ ...filters, employment_type: type });
    setShowEmploymentDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setShowCityDropdown(false);
      }
      if (employmentDropdownRef.current && !employmentDropdownRef.current.contains(event.target)) {
        setShowEmploymentDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.filter}>
      <div className={styles.filterItem}>
        <input
          type="text"
          name="company_name"
          placeholder="Компания"
          onChange={handleChange}
          className={styles.filterInput}
        />
      </div>
      <div className={styles.filterItem} ref={cityDropdownRef}>
        <input
          type="text"
          name="area_name"
          placeholder="Город"
          value={filters.area_name || ''}
          onChange={handleChange}
          className={styles.filterInput}
        />
        <button
          className={`${styles.dropdownButton} ${showCityDropdown ? styles.dropdownButtonOpen : ''}`}
          onClick={() => setShowCityDropdown(!showCityDropdown)}
        >
          &#9660;
        </button>
        {showCityDropdown && (
          <ul className={styles.dropdownList}>
            {cities.map((city) => (
              <li key={city} onClick={() => handleCitySelect(city)}>
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.filterItem} ref={employmentDropdownRef}>
        <input
          type="text"
          name="employment_type"
          placeholder="Тип занятости"
          value={filters.employment_type || ''}
          onChange={handleChange}
          className={styles.filterInput}
        />
        <button
          className={`${styles.dropdownButton} ${showEmploymentDropdown ? styles.dropdownButtonOpen : ''}`}
          onClick={() => setShowEmploymentDropdown(!showEmploymentDropdown)}
        >
          &#9660;
        </button>
        {showEmploymentDropdown && (
          <ul className={styles.dropdownList}>
            {employmentTypes.map((type) => (
              <li key={type} onClick={() => handleEmploymentSelect(type)}>
                {type}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VacancyFilter;
