import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Modal from "../Modal/Modal";
import { UserContext } from "../../UserContext";

const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await respuesta.json();
      const gestor = await data.gestor;
      console.log(gestor);
      if (respuesta && respuesta.status === 200) {
        setUser(gestor);
        navigate("/landing");
      } else if (respuesta && respuesta.status === 400) {
        setError(respuesta.error);
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
            value={email}
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
