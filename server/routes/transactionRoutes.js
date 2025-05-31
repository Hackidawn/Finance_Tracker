const express = require('express');
const router = express.Router();
const { addTransaction, getTransactions, deleteTransaction } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getTransactions)
  .post(protect, addTransaction);

router.delete('/:id', protect, deleteTransaction);

module.exports = router;
