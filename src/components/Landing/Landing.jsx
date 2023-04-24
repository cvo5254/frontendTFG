import React from "react";
import "./Landing.css";

const Landing = () => {
  const activateUsers = () => {
    // Lógica para activar usuarios registrados
  };

  return (
    <div>
      <div className="Landing Container">
        <h1>Nombre de la App</h1>
      </div>
      <ul className="Menu">
        <li>
          <button>Emergencias</button>
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
