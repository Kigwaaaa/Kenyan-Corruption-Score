const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5175;

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for ministries data
app.get('/api/ministries', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'ministries.json'), 'utf8'));
    res.json(data);
  } catch (error) {
    console.error('Error reading ministries data:', error);
    res.status(500).json({ error: 'Failed to fetch ministries data' });
  }
});

// API endpoint for individual ministry
app.get('/api/ministries/:id', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'ministries.json'), 'utf8'));
    const ministry = data.ministries.find(m => m.id === parseInt(req.params.id));
    
    if (!ministry) {
      return res.status(404).json({ error: 'Ministry not found' });
    }
    
    res.json(ministry);
  } catch (error) {
    console.error('Error reading ministry data:', error);
    res.status(500).json({ error: 'Failed to fetch ministry data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 