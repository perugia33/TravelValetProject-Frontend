/* eslint-disable react/prop-types */


function LoginForm({onToggle}) {
  
    return (
      <div>
        <h2>Login</h2>
        <form>
          <div>
            <label>Username:</label>
            <input type="text" name="username" required />
            </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Need to setup an account? <button onClick={onToggle}>Sign Up</button>
        </p>
      </div>
    );
  }
  
  
  export default LoginForm
  
