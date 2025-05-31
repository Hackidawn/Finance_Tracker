import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Charts from './Charts';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div style={container}>
      <div style={card}>
        <div style={header}>
          <h1 style={title}>Dashboard</h1>
          <button onClick={logout} style={logoutButton}>Logout</button>
        </div>
        <TransactionForm />
        
        <TransactionList />
        <Charts />
      </div>
    </div>
  );
};

const container = {
  minHeight: '100vh',
  backgroundColor: '#121212',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
};

const card = {
  backgroundColor: '#1a1a1a',
  padding: '2rem',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '800px',
  boxShadow: '0 4px 20px 2px rgba(255,255,255,0.2)',
  color: 'white',
};

const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem',
};

const title = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const logoutButton = {
  backgroundColor: '#e63946',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

export default Dashboard;
