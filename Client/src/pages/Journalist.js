import React, { useState, useEffect } from 'react';
import '../styles/Journalist.css';

const Journalist = () => {
  // State to store title, content, and newspapers data
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [newspapers, setNewspapers] = useState([]);

  // Load stored newspapers from localStorage when component mounts
  useEffect(() => {
    const storedNewspapers = JSON.parse(localStorage.getItem('newspapers')) || [];
    setNewspapers(storedNewspapers);
  }, []);

  // Function to handle adding a new newspaper
  const handleAddNewspaper = () => {
    if (title.trim() && content.trim()) {
      const newNewspaper = { title, content };
      const updatedNewspapers = [...newspapers, newNewspaper];
      setNewspapers(updatedNewspapers);
      localStorage.setItem('newspapers', JSON.stringify(updatedNewspapers));
      setTitle(''); // Clear the title input field
      setContent(''); // Clear the content input field
    }
  };

  // Function to handle deleting a newspaper
  const handleDeleteNewspaper = (index) => {
    const updatedNewspapers = newspapers.filter((_, i) => i !== index);
    setNewspapers(updatedNewspapers);
    localStorage.setItem('newspapers', JSON.stringify(updatedNewspapers));
  };

  return (
    <div className="journalist-container">
      <h1>Welcome to the Journalist Page</h1>

      <div className="input-container">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter newspaper title"
          className="title-input"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter newspaper content"
          className="content-input"
        />
        <button onClick={handleAddNewspaper} className="add-btn">Add</button>
      </div>

      <div className="newspapers-container">
        {newspapers.map((newspaper, index) => (
          <div key={index} className="newspaper">
            <h3 className="newspaper-title">{newspaper.title}</h3>
            <p className="newspaper-content">{newspaper.content}</p>
            <button className="delete-btn" onClick={() => handleDeleteNewspaper(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journalist;
