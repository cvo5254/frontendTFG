import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Table from "../Table/Table";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateFlag, setUpdateFlag] = useState(false);

  const getUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/obtener_usuarios/?is_active=False"
      );
      const data = await response.json();
      const users = data.map((user) => ({
        id: user.id,
        Email: user.email,
        Estado: user.is_active,
        Acciones: (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleActivate(user.id)}
            >
              Activar
            </Button>
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
      console.log(users);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [updateFlag]); // Se ejecuta solo una vez al inicializar el componente

  const handleActivate = async (userId) => {
    try {
      // Realizar la petición PUT para activar el usuario
      await fetch(`http://localhost:8000/api/aprobar_registro`, {
        method: "PUT",
        body: JSON.stringify({ user_id: userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Volver a realizar la solicitud para obtener los usuarios actualizados
      setUpdateFlag(!updateFlag);
      console.log("Activar usuario con el ID:", userId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    // Lógica para eliminar usuario con el ID `id`
    console.log("Eliminar usuario con el ID:", id);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const columns = [
    { field: "Id", headerName: "ID", width: 200 },
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

export default Users;
