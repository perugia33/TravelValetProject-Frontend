/* eslint-disable react/prop-types */

import {  useState, } from 'react';
import {  useAuth,} from '../contexts/AuthContext.jsx'; 
import styles from './LoginForm.module.css' 

function LoginForm({onToggle}) {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login, clientApi} = useAuth();
  const [error, setError] = useState('');
  // const clientApi = useContext(AuthContext)

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
      const response = await clientApi.post('user/login',{username, password});
      const {access_token} = response.data
      const{user}=response.data
      if (access_token) {
        login(access_token, user);
        // window.location.href = 'http://localhost:5173'; /**** */
      }else {
        throw new Error("No access token received")
      }
      
      
    } catch (err) {
      console.error('Error logging in: ', err.response ? err.response.data : err.message);
      setError('Invalid username or password'); 
      
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
          <h1>Travel Valet</h1>
          <h2>Login to Begin</h2>
          <br />
          <form className={styles.formGroup} onSubmit={handleSubmit}>           <div>
               <label className={styles.label}>Username:</label>
               <input type="text" name="username" required onChange={(e) => setUsername(e.target.value)} className={styles.formInput }/>
              </div>
           <div>
               <label className={styles.label}>Password:</label>               <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)} className={styles.formInput } />
          </div>
           {error && <p className={styles.error}>{error}</p>}
           <button type="submit" className={styles.formButton}>Login</button>
           </form>
           <br />
          <h2>
           Need to setup an account? <button onClick={onToggle} className={styles.toggleButton} >Click Here</button>
          </h2>
       </div>
     </div>
  );
}


// function LoginForm({onToggle}) {
  
//     return (
//       <div className={styles.loginContainer}>
//         <div className={styles.formContainer}>
//             <h1>Travel Valet</h1>
//             <h2>Login to Begin</h2>
//             <br />
//             <form className={styles.formGroup}>
//             <div>
//                 <label className={styles.label}>Username:</label>
//                 <input type="text" name="username" required  className={styles.formInput }/>
//                 </div>
//             <div>
//                 <label className={styles.label}>Password:</label>
//                 <input type="password" name="password" required className={styles.formInput } />
//             </div>
//             <button type="submit" className={styles.formButton}>Login</button>
//             </form>
//             <br />
//             <h2>
//             Need to setup an account? <button onClick={onToggle} className={styles.toggleButton} >Click Here</button>
//             </h2>
//         </div>
//       </div>
//     );
//   }
  
  
  export default LoginForm
  
