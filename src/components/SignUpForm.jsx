// function SignUpForm() {
//     return (
//         <div>
//             <h1>Create an account</h1>
//         </div>
//     )
// }

// export default SignUpForm
// import React from 'react';
/* eslint-disable react/prop-types */

import styles from './SignUpForm.module.css';
function SignUpForm({ onToggle }) {
  return (
    <div className={styles.signUpContainer}>
        <div className={styles.formContainer}>
            <h1>Travel Valet</h1>
            <h2>Registration Form</h2>
            <br />
            <form className={styles.formGroup} >
                <div>
                <label htmlFor="username" className={styles.label}>Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
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
            className={styles.formInput}    
          />
        </div>
        </form>
        <button className={styles.formButton} >Submit</button> 
       <br />
        <h2>
         Already have an account? <button type="button" onClick={onToggle} className={styles.toggleButton} >Login</button>
        </h2>
    
      </div>
    </div>  
  );
}

export default SignUpForm;

