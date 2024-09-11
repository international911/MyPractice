import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBriefcase } from 'react-icons/fa';
import styles from '../styles/Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navLink}>
        <FaHome /> Главная
      </Link>
      <Link to="/vacancies" className={styles.navLink}>
        <FaBriefcase /> Вакансии
      </Link>
    </nav>
  );
};

export default Navbar;