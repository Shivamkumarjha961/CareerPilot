require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const githubRoutes = require('./routes/githubRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const aiRoutes = require('./routes/aiRoutes');

const jobRoutes = require("./routes/jobRoutes");

connectDB();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://careerpilot-frontend-alpha.vercel.app',
  'https://careerpilot-frontend.vercel.app'
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.includes(origin) ||
                      /^https:\/\/careerpilot-frontend-.*\.vercel\.app$/.test(origin) ||
                      /^http:\/\/localhost(:\d+)?$/.test(origin) ||
                      /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin);
                      
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());


// ✅ Static uploads folder
app.use('/uploads', express.static('uploads'));


// ✅ Routes
app.use('/api/ai', aiRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/users', userRoutes);

app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;