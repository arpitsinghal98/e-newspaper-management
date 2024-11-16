// client/src/pages/HomePage.js
import React from 'react';
import '../styles/Homepage.css';
import Navbar from '../components/Navbar';

const HomePage = () => {

  return (
    <div className="main-container">
      <Navbar/>

      <section className="hero-section">
        <h1>Welcome to E-Newspaper</h1>
        <p>Explore tailored content for readers, journalists, and writers. Choose your path and discover a unique experience curated just for you.</p>
      </section>
    </div>
  );
};

export default HomePage;
