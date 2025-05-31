import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import API from '../api';

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/auth/${type}`, { email, password });
      login(res.data.token);
    } catch {
      alert('Authentication failed.');
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleSubmit} style={card}>
        <h2 style={title}>{type === 'login' ? 'Login' : 'Register'}</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={input}
        />

        <button type="submit" style={button}>
          {type === 'login' ? 'Login' : 'Register'}
        </button>

        <p style={footer}>
          {type === 'login' ? (
            <>
              Not a user?{' '}
              <Link to="/register" style={linkStyle}>
                Register now!
              </Link>
            </>
          ) : (
            <>
              Already registered?{' '}
              <Link to="/login" style={linkStyle}>
                Login here.
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

// Styles
const container = {
  minHeight: '100vh',
  backgroundColor: '#121212',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const card = {
  backgroundColor: '#1a1a1a',
  padding: '2rem',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '400px',
  boxShadow: '0 4px 20px rgba(255,255,255,0.2)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  color: 'white',
};

const title = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
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

const footer = {
  fontSize: '14px',
  textAlign: 'center',
  marginTop: '1rem',
};

const linkStyle = {
  color: '#3b82f6',
  textDecoration: 'none',
  fontWeight: 'bold',
};

export default AuthForm;
