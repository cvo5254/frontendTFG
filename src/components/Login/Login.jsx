import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/login";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      if (response.status === 200) {
        navigate("/landing");
      } else {
        console.error("Error en la respuesta del servidor:", response.error);
      }
    } catch (error) {
      console.error("Error de red al hacer la petición:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            className="username-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            className="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button className="button-login" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
