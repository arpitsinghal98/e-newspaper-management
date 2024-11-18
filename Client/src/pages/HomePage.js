import React from 'react';
import '../styles/Homepage.css';

const HomePage = () => {
  return (
    <div className="main-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to E-Newspaper</h1>
          <p>
            Explore tailored content for readers, journalists, and writers. 
            Choose your path and discover a unique experience curated just for you.
          </p>
          <button className="cta-button">Get Started</button>
        </div>
        <div className="hero-image">
          <img src="/images/HomePage.png" alt="E-Newspaper" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
