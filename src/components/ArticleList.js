// client/src/components/ArticleList.js
import React, { useEffect, useState } from 'react';
import { getArticles, deleteArticle } from '../services/api';
import ArticleCard from './ArticleCard';
import '../styles/ArticleList.css';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getArticles();
      setArticles(response.data);
    })();
  }, []);

  const handleDelete = async (id) => {
    await deleteArticle(id);
    setArticles(articles.filter(article => article.id !== id));
  };

  return (
    <div className="article-list">
      <h2>Articles List</h2>
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ArticleList;
