import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Database from './pages/Database';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/database" element={<Database />} />
    </Routes>
  );
};

export default AppRouter;
