// client/src/pages/AboutPage.js
import React from "react";
import "../styles/AboutPage.css";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">

      <h1>About Group 3</h1>
      <p id="about_group3">
        Welcome to the About page for Group 3. Meet our dedicated team members
        who work tirelessly to bring innovation and creativity to our projects.
      </p>

      <div className="team-section">
        <div className="team-member">
          <img
            src="/images/arpit.jpeg"
            alt="Arpit Singhal"
            className="member-photo"
          />
          <h2>Arpit Singhal</h2>
          <p>
            Arpit worked on integrating the UI with Backend. He also created
            Backend APIs to perform all Database queries from API to Database
            including CRUD operations and OLAP queries.
          </p>
        </div>

        <div className="team-member">
          <img
            src="/images/ayush.jpeg"
            alt="Ayush Upadhyay"
            className="member-photo"
          />
          <h2>Ayush Upadhyay</h2>
          <p>
            Ayush created an user interface including all the pages of the
            website. He also styled the components to make it aligned and looks
            good.
          </p>
        </div>

        <div className="team-member">
          <img
            src="/images/haard.jpg"
            alt="Haard Patel"
            className="member-photo"
          />
          <h2>Haard Patel</h2>
          <p>
            Haard worked on database functionalities including creating the
            schema, creating SQL queries to put in the backend api.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
