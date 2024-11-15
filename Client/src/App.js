import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Adjust the import path as needed
import Journalist from './pages/Journalist'; // Adjust the import path as needed
import User from './pages/User';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journalist" element={<Journalist />} />
        <Route path="/User" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
