/* eslint-disable react/prop-types */
import styles from './LoginForm.module.css' 


function LoginForm({onToggle}) {
  
    return (
      <div className={styles.loginContainer}>
        <div className={styles.formContainer}>
            <h1>Travel Valet</h1>
            <h2>Login to Begin</h2>
            <br />
            <form className={styles.formGroup}>
            <div>
                <label className={styles.label}>Username:</label>
                <input type="text" name="username" required  className={styles.formInput }/>
                </div>
            <div>
                <label className={styles.label}>Password:</label>
                <input type="password" name="password" required className={styles.formInput } />
            </div>
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
  
  
  export default LoginForm
  
