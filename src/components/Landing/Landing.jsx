import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import { UserContext } from "../../UserContext";

const Landing = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const activateUsers = () => {
    navigate("/users");
  };

  const publishEmergencies = () => {
    navigate("/publish");
  };

  const usersAdmin = () => {
    navigate("/usersAdmin");
  };

  const channelsAdmin = () => {
    navigate("/channelsAdmin");
  };

  const emergenciesAdmin = () => {
    navigate("/emergenciesAdmin");
  };

  const gestorsAdmin = () => {
    navigate("/gestorsAdmin");
  };

  return (
    <div>
      <ul className="Menu">
        <li>
          <div>
            <button>Emergencias</button>
            <ul className="SubMenu">
              {user.es_administrador && (
                <li>
                  <button onClick={emergenciesAdmin}>
                    Gestión de emergencias
                  </button>
                </li>
              )}
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
          <ul className="SubMenu">
            {user.es_administrador && (
              <li>
                <button onClick={channelsAdmin}>Gestión de canales</button>
              </li>
            )}
          </ul>
        </li>
        <li>
          <div>
            <button>Usuarios</button>
            <ul className="SubMenu">
              {user.es_administrador && (
                <li>
                  <button onClick={usersAdmin}>
                    Gestión de usuarios básicos
                  </button>
                </li>
              )}
              {user.es_administrador && (
                <li>
                  <button onClick={gestorsAdmin}>
                    Gestión de usuarios gestores
                  </button>
                </li>
              )}
              <li>
                <button onClick={activateUsers}>
                  Activar usuarios registrados
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div className="Landing Container">
        <h1>Nombre de la App</h1>
      </div>
    </div>
  );
};

export default Landing;
