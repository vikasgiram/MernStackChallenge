const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI);

// API routes
app.use('/api', require('./routes'));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Anything that doesn't match the above routes, send back the index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
