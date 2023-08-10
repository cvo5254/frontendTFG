import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import { UserContext } from "../../UserContext";

const Landing = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="landing-container">
      <div className="menu-box">
        <h1 className="landing-title">Página de Gestión</h1>
        <div className="menu-row">
          <div className="menu-column">
            <h2>Emergencias</h2>
            <div className="menu-item-group">
              {user.es_administrador && (
                <button
                  className="menu-item"
                  onClick={() => handleNavigation("/emergenciesAdmin")}
                >
                  Gestión de emergencias
                </button>
              )}
              <button
                className="menu-item"
                onClick={() => handleNavigation("/publish")}
              >
                Publicar emergencias informadas
              </button>
            </div>
          </div>
          <div className="menu-column">
            <h2>Usuarios</h2>
            <div className="menu-item-group">
              {user.es_administrador && (
                <button
                  className="menu-item"
                  onClick={() => handleNavigation("/usersAdmin")}
                >
                  Gestión de usuarios básicos
                </button>
              )}
              {user.es_administrador && (
                <button
                  className="menu-item"
                  onClick={() => handleNavigation("/gestorsAdmin")}
                >
                  Gestión de usuarios gestores
                </button>
              )}
              <button
                className="menu-item"
                onClick={() => handleNavigation("/activateUsers")}
              >
                Activar usuarios registrados
              </button>
            </div>
          </div>
          <div className="menu-column">
            <h2>Canales</h2>
            <div className="menu-item-group">
              {user.es_administrador && (
                <button
                  className="menu-item"
                  onClick={() => handleNavigation("/channelsAdmin")}
                >
                  Gestión de canales
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
