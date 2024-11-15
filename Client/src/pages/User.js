import React, { useState } from 'react';
import '../styles/User.css';

const User = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);

  const handleSearch = () => {
    // Mock user data for demonstration
    const mockUserData = {
      subscription_plan: 'Premium Plan',
      favourite_topic: 'Technology',
    };

    setUserData(mockUserData);
    console.log('Searching for User_ID:', userId);
  };

  return (
    <div className="userPage">
      <h1>Welcome to the User Page</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter your User_ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Conditionally render subscription plan and favourite topic */}
      {userData && (
        <div className="userData">
          <h2>Subscription Plan: {userData.subscription_plan}</h2>
          <h3>Favourite Topic: {userData.favourite_topic}</h3>
        </div>
      )}
    </div>
  );
};

export default User;
