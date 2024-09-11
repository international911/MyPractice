import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router';
import Navbar from './components/Navbar';
import styles from './styles/App.module.scss';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Navbar />
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;