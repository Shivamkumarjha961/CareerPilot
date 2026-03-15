require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const githubRoutes = require('./routes/githubRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const aiRoutes = require('./routes/aiRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


// ✅ Static uploads folder
app.use('/uploads', express.static('uploads'));


// ✅ Routes
app.use('/api/ai', aiRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});








// //   node server.js