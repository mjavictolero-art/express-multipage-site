const express = require('express'); // fixed quotes
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000; // fixed OR operator

// Serve static files
app.use(express.static(path.join(__dirname, 'public'))); // fixed __dirname

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Blog page route
app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'blog.html'));
});

// API route to get posts
app.get('/api/posts', (req, res) => {
  try {
    const posts = JSON.parse(fs.readFileSync('./data/posts.json', 'utf8')); // fixed method and encoding
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read posts.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
