const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// const authRoutes = require('./routes/authRoutes');
// const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

// ✅ CORS setup
const allowedOrigins = [
  'https://finance-tracker-zynx.vercel.app',
  'https://finance-tracker-ard5d6kcf-achints-projects-e510b495.vercel.app',
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log('🌐 Incoming Origin:', origin);
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
app.options('*', cors(corsOptions)); // ✅ Handle preflight properly
app.use(express.json());

// ✅ Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/transactions', transactionRoutes);

// ✅ MongoDB connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
});
