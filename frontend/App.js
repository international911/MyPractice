import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppRouter from './router';
import styles from './styles/App.module.scss';
import { motion } from 'framer-motion';

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <div className={styles.navbar}>
          <div
            className={styles.navbar__item}
            onClick={() => {
              navigate('/');
            }}
          >
            Вакансии
          </div>
          <div
            className={styles.navbar__item}
            onClick={() => {
              navigate('/database');
            }}
          >
            База данных
          </div>
        </div>
      </motion.div>
      <AppRouter />
    </div>
  );
}

export default App;
