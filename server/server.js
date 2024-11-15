// server/server.js
const express = require('express');
const cors = require('cors');
const articleRoutes = require('./routes/articles');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/articles', articleRoutes);

const PORT = 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
