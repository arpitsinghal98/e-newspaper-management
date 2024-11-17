import React from 'react';
import '../styles/Homepage.css'; // Ensure you are importing the CSS file
import Navbar from '../components/Navbar'; // Assuming you have a Navbar component

const HomePage = () => {
  return (
    <div className="main-container">
      <Navbar />
      <section className="hero-section">
        <img src="1.jpg" alt="Hero Image" /> {/* The image that will cover the entire screen */}
        <h1>Welcome to E-Newspaper</h1>
        <p>Explore tailored content for readers, journalists, and writers. Choose your path and discover a unique experience curated just for you.</p>
      </section>
    </div>
  );
};

export default HomePage;
