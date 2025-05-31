import { useState } from 'react';
import API from '../api';

const TransactionForm = () => {
  const [form, setForm] = useState({
    type: 'expense',
    category: '',
    amount: '',
    note: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/transactions', form);
    setForm({ type: 'expense', category: '', amount: '', note: '' });
    window.location.reload(); // or trigger a re-fetch
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <select
        value={form.type}
        onChange={e => setForm({ ...form, type: e.target.value })}
        style={input}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
        required
        style={input}
      />
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={e => setForm({ ...form, amount: parseFloat(e.target.value) })}
        required
        style={input}
      />
      <input
        type="text"
        placeholder="Note (optional)"
        value={form.note}
        onChange={e => setForm({ ...form, note: e.target.value })}
        style={input}
      />
      <button type="submit" style={button}>
        Add Transaction
      </button>
    </form>
  );
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  marginBottom: '2rem',
};

const input = {
  padding: '0.5rem',
  backgroundColor: '#27272a',
  border: '1px solid #3f3f46',
  borderRadius: '6px',
  color: 'white',
};

const button = {
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  padding: '0.5rem',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

export default TransactionForm;
