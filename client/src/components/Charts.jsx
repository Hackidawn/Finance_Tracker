import { useEffect, useState } from 'react';
import API from '../api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Charts = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get('/transactions');
      setTransactions(res.data);
    };
    fetchData();
  }, []);

  // Calculate totals
  let incomeTotal = 0;
  let expenseTotal = 0;

  transactions.forEach(tx => {
    if (tx.type === 'income') {
      incomeTotal += tx.amount;
    } else if (tx.type === 'expense') {
      expenseTotal += tx.amount;
    }
  });

  const barData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Amount in Rupees',
        data: [incomeTotal, expenseTotal],
        backgroundColor: ['#22c55e', '#ef4444'], // ✅ Green and red
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // ✅ No colored label box
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `₹${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: '#333' },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white',
          callback: function (value) {
            return `₹${value}`;
          },
        },
        grid: { color: '#333' },
      },
    },
  };

  return (
    <div
      style={{
        backgroundColor: '#1a1a1a',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(255,255,255,0.1)',
        color: 'white',
        marginBottom: '2rem',
      }}
    >
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '1rem' }}>
        Total Income vs Expense
      </h3>
      <Bar data={barData} options={options} />
    </div>
  );
};

export default Charts;
