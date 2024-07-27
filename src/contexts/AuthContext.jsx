import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types'; // Add this line to import PropTypes

// Create the context
const AuthContext = createContext();

// Create a provider component
export function AuthProvider ({ children }) {
  const [auth, setAuth] = useState(()=>localStorage.getItem('jwt')|| null);
  // const [user, setUser] = useState(()=>localStorage.getItem('user')|| null);
  // Add prop validation for 'children'
  // 
  // const [auth, setAuth] = useState(null);

  const login = (token) => {
    setAuth(token);
    localStorage.setItem('jwt', token);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('jwt');
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