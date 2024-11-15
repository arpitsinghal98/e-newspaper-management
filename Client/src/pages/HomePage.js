// client/src/pages/HomePage.js
import React from 'react';
import '../styles/Homepage.css';

const HomePage = () => {
  return (
    <div className="main-container">
      <div className="navbar">
        <button className="nav-button" onClick={() => window.open('/User', '_blank')}>User</button>
        <button className="nav-button" onClick={() => window.open('/journalist', '_blank')}>Journalist</button>
        <button className="nav-button">Writer</button>
      </div>

      {/* Video section */}
      <div className="video-container">
        <video 
          className="background-video"
          autoPlay
          muted
          loop
          playsInline
        >
         <source src="/E_Newspaper.mp4" type="video/mp4" />

          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HomePage;
