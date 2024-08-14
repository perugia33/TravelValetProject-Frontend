import { createContext, useState, useContext,useEffect} from 'react';
import PropTypes from 'prop-types'; 
import clientApi from "../services/clientApi";
import { updateAuthHeaders } from '../utils/authUtils';

// Create the context
const AuthContext = createContext();

// Create a provider component
export function AuthProvider ({ children }) {
  const [auth, setAuth] = useState(()=>localStorage.getItem('jwt')|| null);
  const [user, setUser]= useState(()=>localStorage.getItem('user')|| null);

  useEffect(() => {
    console.log("auth", auth)
    updateAuthHeaders(auth, clientApi);
    console.log('clientApi keys', Object.keys(clientApi.defaults.headers.common));
  }, [auth]);
  

  const login = (token, user) => {
    setAuth(token);
    localStorage.setItem('jwt', token);
    localStorage.setItem('user', user);
    window.location.href = 'https://travel-valet.onrender.com';
    // import.meta.env.VITE_API_HOME_URL || 'http://localhost:5173';
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('jwt');
    setUser(null);
    localStorage.removeItem('user');
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