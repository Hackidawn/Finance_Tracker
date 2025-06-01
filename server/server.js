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
// ✅ Set allowed Vercel domains
const allowedOrigins = [
  'https://finance-tracker-zynx.vercel.app', // your actual frontend
];

// ✅ CORS Options
const corsOptions = {
  origin: function (origin, callback) {
    console.log('🌐 Incoming Origin:', origin); // Log every request origin

    if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      console.log('✅ Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('❌ Origin blocked:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // ✅ Handle preflight OPTIONS correctly
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
