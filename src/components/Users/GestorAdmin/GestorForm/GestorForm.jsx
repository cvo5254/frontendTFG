import React, { useState, useEffect } from "react";
import "./EditForm.css";

const GestorForm = ({ gestorId, onAccept, onCancel }) => {
  const [gestor, setGestor] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    direccion: "",
  });

  useEffect(() => {
    const getGestor = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/${gestorId}/getGestor/`
        );
        const data = await response.json();
        setGestor(data);
      } catch (error) {
        console.error(error);
      }
    };

    getGestor();
  }, []);

  const handleCancel = () => {
    onCancel();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGestor((prevGestor) => ({
      ...prevGestor,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (gestor.password !== gestor.confirmPassword) {
        console.log("Las contraseñas no coinciden");
        return;
      }

      const updatedGestor = {
        ...gestor,
        password: gestor.password !== "" ? gestor.password : undefined,
      };

      const response = await fetch(
        `http://localhost:8000/api/${gestorId}/edit_gestor/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedGestor),
        }
      );
      console.log(response);
      onAccept();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="gestor-form-container " onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={gestor.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={gestor.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirmar contraseña:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={gestor.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="direccion">Descripción:</label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          value={gestor.direccion}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Telefono:</label>
        <input
          type="text"
          id="telefono"
          name="telefono"
          value={gestor.telefono}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Guardar</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default GestorForm;
