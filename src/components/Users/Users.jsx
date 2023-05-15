import Table from "../Table/Table";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/obtener_usuarios/?is_active=False"
        );
        const data = await response.json();
        const users = data.map((user, index) => ({
          Id: index,
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
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();
  }, []);

  const handleActivate = (id) => {
    // Lógica para activar usuario con el ID `id`
    console.log("Activar usuario con el ID:", id);
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
      <Table data={users} columns={columns} />
    </div>
  );
};

export default Users;
