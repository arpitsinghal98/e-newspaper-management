import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Adjust the import path as needed
import About from './pages/About';
import QueryPage from './pages/Query';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/query" element={<QueryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
