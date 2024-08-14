import { createContext, useState, useContext,useEffect} from 'react';
import PropTypes from 'prop-types'; 
import clientApi from "../services/expensesApi";
import { updateAuthHeaders } from '../utils/authUtils';

// Create the context
const AuthContext = createContext();

// Create a provider component
export function AuthProvider ({ children }) {
  const [auth, setAuth] = useState(()=>localStorage.getItem('jwt')|| null);
  const [user, setUser]= useState(()=>localStorage.getItem('user')|| null);
  
  useEffect(() => {
    updateAuthHeaders(auth, clientApi);
  }, [auth]);
  

  const login = (token, user) => {
    setAuth(token);
    localStorage.setItem('jwt', token);
    localStorage.setItem('user', user)
    window.location.href = 'http://localhost:5173'; 
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('jwt');
    setUser(null);
    localStorage.removeItem('username');
    
  };

  return (
    <AuthContext.Provider value={{ auth, user,login, logout, clientApi}}>
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