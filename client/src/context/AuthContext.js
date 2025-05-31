import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const login = (t) => {
    console.log('✅ Received token:', t); // Debug log

    if (t) {
      localStorage.setItem('token', t);
      setToken(t);
      navigate('/');
    } else {
      console.error('❌ No token received during login');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
