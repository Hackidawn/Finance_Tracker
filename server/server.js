const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

// ✅ Temporarily allow all origins (FIX CORS ERROR)
// Must be BEFORE any route definitions
const allowedOrigins = [
  'https://finance-tracker-zynx.vercel.app',
  'https://finance-tracker-ard5d6kcf-achints-projects-e510b495.vercel.app',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


app.use(cors(corsOptions));
app.use(express.json());

// ✅ Logging middleware (optional)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// ✅ MongoDB connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  // These options are now ignored by MongoDB driver v4+
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
});
