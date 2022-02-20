import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from './components/HomePage';
import Header from './components/Header';
const LazyPage = React.lazy(() => import('./components/LazyPage'));

import './app.css';

const App = () => {
  return (
    <Router>
        <Header />
      <div>
        <Routes>
          <Route exact path="/" element={HomePage} />
          <Route exact path="/lazy" element={
              <React.Suspense fallback="...loading">
                  <LazyPage />
              </React.Suspense>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;