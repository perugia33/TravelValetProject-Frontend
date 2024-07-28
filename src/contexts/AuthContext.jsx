import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types'; 

// Create the context
const AuthContext = createContext();

// Create a provider component
export function AuthProvider ({ children }) {
  const [auth, setAuth] = useState(()=>localStorage.getItem('jwt')|| null);
 
  const login = (token) => {
    setAuth(token);
    localStorage.setItem('jwt', token);
    window.location.href = 'http://localhost:5173/expenses'; 
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    // window.location.href = 'http://localhost:5173';
    
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
export function useAuth() {
  return useContext(AuthContext);
}
export { AuthContext };