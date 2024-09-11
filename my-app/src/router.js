import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VacanciesPage from './pages/VacanciesPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/vacancies" element={<VacanciesPage />} />
    </Routes>
  );
};

export default AppRouter;