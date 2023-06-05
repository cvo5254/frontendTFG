import { useState, useEffect, useId } from "react";
import { Button } from "@mui/material";
import GestorForm from "./GestorForm/GestorForm";
import Table from "../../Table/Table";

const GestorAdmin = () => {
  const [gestors, setGestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedGestorId, setSelectedGestorId] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const getGestors = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/getGestors/");
      const data = await response.json();
      const gestors = data.map((gestor) => ({
        id: gestor.id,
        Email: gestor.email,
        Telefono: gestor.telefono,
        Direccion: gestor.direccion,
        Admin: gestor.es_administrador,
        Acciones: (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleEdit(gestor.id)}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => handleDelete(gestor.id)}
            >
              Eliminar
            </Button>
          </>
        ),
      }));
      setGestors(gestors);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGestors();
  }, [updateFlag]);

  const handleEdit = (gestorId) => {
    setSelectedGestorId(gestorId);
    setShowForm(true);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setSelectedGestorId("");
    setShowForm(true);
  };

  const handleFormAccept = () => {
    // Lógica para manejar la acción de aceptar en PublishForm
    setShowForm(false);
    setUpdateFlag(!updateFlag);
  };

  const handleFormCancel = () => {
    // Lógica para manejar la acción de cancelar en PublishForm
    setShowForm(false);
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
    { field: "Telefono", headerName: "Telefono", width: 200 },
    { field: "Direccion", headerName: "Direccion", width: 200 },
    { field: "Admin", headerName: "Admin", width: 200 },
    { field: "Acciones", headerName: "Acciones", width: 200 },
  ];

  return (
    <div>
      {showForm && (
        <GestorForm
          isCreating={isCreating}
          gestorId={selectedGestorId}
          onAccept={handleFormAccept}
          onCancel={handleFormCancel}
        />
      )}
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Crear nuevo gestor
      </Button>
      <Table data={gestors} columns={columns} updateFlag={updateFlag} />
    </div>
  );
};

export default GestorAdmin;
