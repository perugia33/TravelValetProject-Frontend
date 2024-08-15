import { createContext, useState, useContext} from 'react';
import PropTypes from 'prop-types'; 
import clientApi from "../services/clientApi";
// import { updateAuthHeaders } from '../utils/authUtils';


// Create a context object to manage authentication state
const AuthContext = createContext();

// Create a provider component
export function AuthProvider ({ children }) {
  // Initialize state with JWT token and user data from local storage or set to null
  const [auth, setAuth] = useState(()=> localStorage.getItem('jwt') || null);
  const [user, setUser] = useState(()=> localStorage.getItem('user') || null);


  // Function to handle User Login:
  const login = (token, user) => {
    // Update the auth state with the new token
    setAuth(token);
    // Update the user state with new user data
    setUser(user);
    // Store the token and user data in local storage
    localStorage.setItem('jwt', token);
    localStorage.setItem('user', user);
    // Redirect to the home page:
    window.location.href = import.meta.env.VITE_API_HOME_URL;
    // || 'https://travel-valet.onrender.com/packinglist';
  };
  
  // Function to handle user logout:
  const logout = () => {
    // Clear the auth state
    setAuth(null);
    setUser(null);
    // Remove token and user datea form local storage
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  };
  
  // Give auth state, login, logout functions and clientApi instance to the rest of the app.
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