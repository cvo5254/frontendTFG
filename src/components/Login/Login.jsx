import React, { useState } from 'react';
import "./Login.css"

const Login = () => { 
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
    <div className='login-container'>
    <h2>Login</h2>
    <form className='form-container' onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          className='username-input'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          className='password-input'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button className='button-login' type="submit">Login</button>
    </form>
    </div>
    );
}

export default Login;