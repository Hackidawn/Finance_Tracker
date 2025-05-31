const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
  try {
    const newTx = await Transaction.create({ ...req.body, user: req.user._id });
    res.status(201).json(newTx);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const txs = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
    res.json(txs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const tx = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!tx) return res.status(404).json({ msg: 'Transaction not found' });
    res.json({ msg: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
