// client/src/pages/HomePage.js
import React from 'react';
import ArticleForm from '../components/ArticleForm';
import ArticleList from '../components/ArticleList';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="header">E-Newspaper Management System</h1>
      <ArticleForm />
      <ArticleList />
    </div>
  );
};

export default HomePage;
