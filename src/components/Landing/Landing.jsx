import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const activateUsers = () => {
    navigate("/users");
  };

  const publishEmergencies = () => {
    navigate("/publish");
  };

  return (
    <div>
      <div className="Landing Container">
        <h1>Nombre de la App</h1>
      </div>
      <ul className="Menu">
        <li>
          <div>
            <button>Emergencias</button>
            <ul className="SubMenu">
              <li>
                <button onClick={publishEmergencies}>
                  Publicar emergencias informadas
                </button>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <button>Canales</button>
        </li>
        <li>
          <div>
            <button>Usuarios</button>
            <ul className="SubMenu">
              <li>
                <button onClick={activateUsers}>
                  Activar usuarios registrados
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Landing;
