// client/src/components/ArticleForm.js
import React, { useState } from 'react';
import { createArticle } from '../services/api';
import '../styles/ArticleForm.css';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createArticle({ title, content });
    setTitle('');
    setContent('');
    window.location.reload(); // Refresh to show updated list
  };

  return (
    <form className="article-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">Create Article</button>
    </form>
  );
};

export default ArticleForm;
