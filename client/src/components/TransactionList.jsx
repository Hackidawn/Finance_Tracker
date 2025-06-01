import { useEffect, useState } from 'react';
import API from '../api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [showSplit, setShowSplit] = useState(false);

  const fetchData = async () => {
    const res = await API.get('/transactions');
    setTransactions(res.data);
  };

  const handleDelete = async (id) => {
    await API.delete(`/transactions/${id}`);
    fetchData();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    doc.setFontSize(18);
    doc.text('Finance Tracker Invoice', 14, 20);

    doc.setFontSize(11);
    doc.text(`Generated on: ${date}`, 14, 28);

    const tableData = transactions.map((tx, i) => [
      i + 1,
      new Date(tx.date).toLocaleDateString(),
      tx.type.charAt(0).toUpperCase() + tx.type.slice(1),
      tx.category,
      `₹${tx.amount.toFixed(2)}`,
      tx.note || '-'
    ]);

    autoTable(doc, {
      startY: 35,
      head: [['#', 'Date', 'Type', 'Category', 'Amount', 'Note']],
      body: tableData,
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
      },
      margin: { left: 14, right: 14 },
    });

    const finalY = doc.lastAutoTable.finalY;

    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    doc.setFontSize(12);
    doc.text(`Total Income: ₹${income.toFixed(2)}`, 14, finalY + 10);
    doc.text(`Total Expense: ₹${expense.toFixed(2)}`, 14, finalY + 20);

    doc.setFontSize(10);
    doc.text('Thank you for using Finance Tracker!', 14, finalY + 35);

    doc.save('transactions.pdf');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const incomeTransactions = transactions.filter(tx => tx.type === 'income');
  const expenseTransactions = transactions.filter(tx => tx.type === 'expense');

  return (
    <div style={container}>
      <div style={header}>
        <h2 style={title}>Transaction History</h2>
        <div>
          <button onClick={() => setShowSplit(!showSplit)} style={toggleButton}>
            {showSplit ? 'View All' : 'Split View'}
          </button>
          <button onClick={handleDownloadPDF} style={pdfButton}>
            Download PDF
          </button>
        </div>
      </div>

      {!showSplit ? (
        <ul style={listStyle}>
          {transactions.map(tx => (
            <li key={tx._id} style={itemStyle}>
              <div style={rowStyle}>
                <div>
                  <p>{tx.category} - {tx.type}</p>
                  <p style={{ fontSize: '0.8rem', color: '#999' }}>
                    {new Date(tx.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <strong style={{ color: tx.type === 'income' ? '#22c55e' : '#ef4444' }}>
                    ₹{tx.amount}
                  </strong>
                  <button onClick={() => handleDelete(tx._id)} style={deleteButton}>🗑️</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div style={splitContainer}>
          <div style={splitColumn}>
            <h4 style={splitTitle}>Income</h4>
            <ul style={listStyle}>
              {incomeTransactions.map(tx => (
                <li key={tx._id} style={itemStyle}>
                  <div style={rowStyle}>
                    <span>{tx.category}</span>
                    <span style={{ color: '#22c55e' }}>₹{tx.amount}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div style={splitColumn}>
            <h4 style={splitTitle}>Expense</h4>
            <ul style={listStyle}>
              {expenseTransactions.map(tx => (
                <li key={tx._id} style={itemStyle}>
                  <div style={rowStyle}>
                    <span>{tx.category}</span>
                    <span style={{ color: '#ef4444' }}>₹{tx.amount}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// 🎨 Styles
const container = {
  backgroundColor: '#1a1a1a',
  padding: '2rem',
  borderRadius: '12px',
  color: 'white',
  boxShadow: '0 4px 20px rgba(255,255,255,0.1)',
};

const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
};

const title = {
  fontSize: '20px',
  fontWeight: 'bold',
};

const toggleButton = {
  fontSize: '0.8rem',
  padding: '0.3rem 0.6rem',
  borderRadius: '5px',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  marginRight: '0.5rem',
};

const pdfButton = {
  fontSize: '0.8rem',
  padding: '0.3rem 0.6rem',
  borderRadius: '5px',
  backgroundColor: '#10b981',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
};

const itemStyle = {
  marginBottom: '0.75rem',
};

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const deleteButton = {
  marginLeft: '0.5rem',
  background: 'none',
  color: 'red',
  border: 'none',
  cursor: 'pointer',
};

const splitContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '2rem',
  marginTop: '1rem',
};

const splitColumn = {
  flex: 1,
};

const splitTitle = {
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  borderBottom: '1px solid #444',
  paddingBottom: '0.3rem',
};

export default TransactionList;
