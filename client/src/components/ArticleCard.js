// client/src/components/ArticleCard.js
import React from 'react';

const ArticleCard = ({ article, onDelete }) => {
  return (
    <div className="article-card">
      <h3>{article.title}</h3>
      <p>{article.content}</p>
      <button onClick={() => onDelete(article.id)}>Delete</button>
    </div>
  );
};

export default ArticleCard;
