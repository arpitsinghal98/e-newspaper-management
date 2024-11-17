// client/src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <button className="nav-button" onClick={() => navigate('/')}>Home</button>
      <button className="nav-button" onClick={() => navigate('/query')}>Query</button>
      <button className="nav-button" onClick={() => navigate('/about')}>About</button>
      <button className="nav-button" onClick={() => navigate('/user')}>User</button>
      <button className="nav-button" onClick={() => navigate('/journalist')}>Journalist</button>
    </nav>
  );
};

export default Navbar;
