// client/src/pages/AboutPage.js
import React from 'react';
import '../styles/AboutPage.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <Navbar/>

      <h1>About Group 3</h1>
      <p>Welcome to the About page for Group 3. Meet our dedicated team members who work tirelessly to bring innovation and creativity to our projects.</p>
      
      <div className="team-section">
        <div className="team-member">
          <img src="/path/to/arpit-picture.jpg" alt="Arpit Singhal" className="member-photo" />
          <h2>Arpit Singhal</h2>
          <p>Arpit is a key member of Group 3, known for his skills in [mention key skills or role].</p>
        </div>

        <div className="team-member">
          <img src="/path/to/ayush-picture.jpg" alt="Ayush Upadhya" className="member-photo" />
          <h2>Ayush Upadhya</h2>
          <p>Ayush contributes to the team with his expertise in [mention key skills or role].</p>
        </div>

        <div className="team-member">
          <img src="/path/to/haard-picture.jpg" alt="Haard Patel" className="member-photo" />
          <h2>Haard Patel</h2>
          <p>Haard brings unique strengths in [mention key skills or role], making him an invaluable part of Group 3.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
