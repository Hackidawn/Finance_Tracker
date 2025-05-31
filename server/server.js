const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

// ✅ Temporary open CORS + origin logging (for debugging)
app.use(cors({
  origin: function (origin, callback) {
    console.log('🌐 Incoming origin:', origin); // Log the origin
    callback(null, true); // Allow all origins temporarily
  },
  credentials: true, // Allows Authorization headers
}));

app.use(express.json());

// ✅ Optional: log all requests to console
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// ✅ Connect to MongoDB
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  // options like useNewUrlParser are no longer required
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
});
