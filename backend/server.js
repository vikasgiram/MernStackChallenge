// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path =require('path');
// const dotenv = require('dotenv');

// const apiRoutes = require('./routes/api');

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`);
//         });
//     })
//     .catch(err => {
//         console.error(err);
//     });

//     app.use('/api', apiRoutes);


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static assets if in production (React frontend)
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// API routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    // Start server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
