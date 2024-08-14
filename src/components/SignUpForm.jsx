/* eslint-disable react/prop-types */
import {useState} from 'react';
import axios from 'axios';

import styles from './SignUpForm.module.css';

function SignUpForm({onToggle}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/register`, {
        username,
        email,
        password
      });
      setSuccess('User registered successfully!');
      setError('');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Error registering user');
      setSuccess('');
    }
  };
  
  return (
    <div className={styles.signUpContainer}>
      <div className={styles.formContainer}>
          <h1>Travel Valet</h1>
          <h2>Registration Form</h2>
          <br />
          <form className={styles.formGroup} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className={styles.label}>Username</label>
              <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.formInput}    
              />
            </div>
            <div>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.formInput}    
              />
            </div>
            
            <div>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.formInput}    
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <button className={styles.formButton} >Submit</button>
          </form>
        
          <br />
          <h2>
            Already have an account? <button type="button" onClick={onToggle} className={styles.toggleButton} >Login</button>
          </h2>
      </div>
    </div>  
  );
  
}
export default SignUpForm;


// function SignUpForm({ onToggle }) {
//   return (
//     <div className={styles.signUpContainer}>
//         <div className={styles.formContainer}>
//             <h1>Travel Valet</h1>
//             <h2>Registration Form</h2>
//             <br />
//             <form className={styles.formGroup} >
//                 <div>
//                 <label htmlFor="username" className={styles.label}>Username</label>
//                 <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     required
//                     className={styles.formInput}    
//                 />
//                 </div>
//                 <div>
//                 <label htmlFor="email" className={styles.label}>Email Address</label>
//                 <input
//                     type="email"
//                     id="email"
//                 name="email"
//                 required
//                 className={styles.formInput}    
//             />
//              </div>
             
//         <div>
//           <label htmlFor="password" className={styles.label}>Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             required
//             className={styles.formInput}    
//           />
//         </div>
//         </form>
//         <button className={styles.formButton} >Submit</button> 
//        <br />
//         <h2>
//          Already have an account? <button type="button" onClick={onToggle} className={styles.toggleButton} >Login</button>
//         </h2>
    
//       </div>
//     </div>  
//   );
// }

// export default SignUpForm;

