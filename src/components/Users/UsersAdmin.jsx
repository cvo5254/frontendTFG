import { useState, useEffect, useId } from "react";
import { Button } from "@mui/material";
import Table from "../Table/Table";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateFlag, setUpdateFlag] = useState(false);

  const getUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/obtener_usuarios/"
      );
      const data = await response.json();
      const users = data.map((user) => ({
        id: user.id,
        Email: user.email,
        Estado: user.is_active,
        Acciones: (
          <>
            {user.is_blocked ? (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleUnblock(user.id)}
              >
                Desbloquear
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleBlock(user.id)}
              >
                Bloquear
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => handleDelete(user.id)}
            >
              Eliminar
            </Button>
          </>
        ),
      }));
      setUsers(users);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [updateFlag]); // Se ejecuta solo una vez al inicializar el componente

  const handleBlock = async (userId) => {
    try {
      await fetch(`http://localhost:8000/api/${userId}/blockUser/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUpdateFlag(!updateFlag);
      console.log("Bloquear usuario con el ID:", userId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnblock = async (userId) => {
    try {
      await fetch(`http://localhost:8000/api/${userId}/unblockUser/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUpdateFlag(!updateFlag);
      console.log("Desbloquear usuario con el ID:", userId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/${id}/deleteUser/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUpdateFlag(!updateFlag);
      console.log("Eliminar usuario con el ID:", id);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "Email", headerName: "Email", width: 200 },
    { field: "Estado", headerName: "Estado", width: 200 },
    { field: "Acciones", headerName: "Acciones", width: 200 },
  ];

  return (
    <div>
      <Table data={users} columns={columns} updateFlag={updateFlag} />
    </div>
  );
};

export default UsersAdmin;
