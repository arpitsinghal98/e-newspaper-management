import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Adjust the import path as needed
import About from './pages/About';
import QueryPage from './pages/Query';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/query" element={<QueryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
