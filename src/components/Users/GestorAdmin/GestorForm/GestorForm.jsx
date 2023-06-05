import React, { useState, useEffect } from "react";
import "./EditForm.css";

const GestorForm = ({ gestorId, isCreating, onAccept, onCancel }) => {
  const [gestor, setGestor] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    direccion: "",
    es_administrador: false,
  });

  useEffect(() => {
    const getGestor = async () => {
      try {
        if (!isCreating) {
          const response = await fetch(
            `http://localhost:8000/api/${gestorId}/getGestor/`
          );
          const data = await response.json();
          setGestor(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getGestor();
  }, [gestorId, isCreating]);

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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setGestor((prevGestor) => ({
      ...prevGestor,
      [name]: checked,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (gestor.password !== gestor.confirmPassword) {
        console.log("Las contraseñas no coinciden");
        return;
      }

      let url = "";
      let method = "";

      if (isCreating) {
        url = "http://localhost:8000/api/create_gestor/";
        method = "POST";
      } else {
        url = `http://localhost:8000/api/${gestorId}/edit_gestor/`;
        method = "PUT";
      }

      const updatedGestor = {
        ...gestor,
        password: gestor.password !== "" ? gestor.password : undefined,
      };

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGestor),
      });

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
      <>
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
      </>
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
        <label htmlFor="telefono">Telefono:</label>
        <input
          type="text"
          id="telefono"
          name="telefono"
          value={gestor.telefono}
          onChange={handleChange}
        />
      </div>
      {isCreating && (
        <div>
          <label htmlFor="esAdministrador">Es Administrador:</label>
          <input
            type="checkbox"
            id="es_administrador"
            name="es_administrador"
            checked={gestor.es_administrador}
            onChange={handleCheckboxChange}
          />
        </div>
      )}
      <button type="submit">{isCreating ? "Crear" : "Guardar"}</button>
      <button onClick={handleCancel}>Cancelar</button>
    </form>
  );
};

export default GestorForm;
