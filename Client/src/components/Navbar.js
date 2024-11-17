// client/src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
// Optional: Install FontAwesome with `npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons`
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faQuestionCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <button className="nav-button" onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faHome} /> Home
      </button>
      <button className="nav-button" onClick={() => navigate('/query')}>
        <FontAwesomeIcon icon={faQuestionCircle} /> Query
      </button>
      <button className="nav-button" onClick={() => navigate('/about')}>
        <FontAwesomeIcon icon={faInfoCircle} /> About
      </button>
    </nav>
  );
};

export default Navbar;
