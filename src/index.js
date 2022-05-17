import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './components/App';
import PageNotFound from './components/Page-not-found';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Router>
    <Routes>
      <Route path="/" element={ <Navigate replace to="/rockies?search=rockies" /> } />
      <Route path="/:filter" element={<App /> } />
      <Route path="*" element={<PageNotFound /> } />
    </Routes>
  </Router>
);

reportWebVitals();
