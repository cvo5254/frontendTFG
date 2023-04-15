import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/login";
import "./Login.css";
import Modal from "../Modal/Modal";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      if (response.status === 200) {
        navigate("/landing");
      } else {
        setError(response.error);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error de red al hacer la petición:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
      <Modal isOpen={showModal} onClose={handleCloseModal} message={error} />
    </div>
  );
};

export default Login;
