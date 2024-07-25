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
function SignUpForm({ onToggle }) {
  return (
    <div>
      <h2>Create  new account</h2>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        {/* <button type="submit">Sign Up</button> */}
        <p>
         Already have an account? <button type="button" onClick={onToggle}>Login</button>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;

