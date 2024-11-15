// server/routes/articles.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM Article', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Article WHERE article_id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const { article_id, title, content, published_date } = req.body;
  const query = 'INSERT INTO Article (article_id, title, content, published_date) VALUES (?, ?, ?, ?)';
  db.query(query, [article_id, title, content, published_date], (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'Article created', articleId: result.insertId });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  db.query('UPDATE Article SET title = ?, content = ? WHERE article_id = ?', [title, content, id], (err) => {
    if (err) throw err;
    res.json({ message: 'Article updated' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Article WHERE article_id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Article deleted' });
  });
});

module.exports = router;
