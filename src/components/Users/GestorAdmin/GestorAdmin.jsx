import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import GestorForm from "./GestorForm/GestorForm";
import Table from "../../Table/Table";
import Modal from "react-modal";
import "./GestorAdmin.css";

const GestorAdmin = () => {
  const [gestors, setGestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedGestorId, setSelectedGestorId] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

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
    setShowFormModal(true);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setSelectedGestorId("");
    setShowFormModal(true);
  };

  const handleFormAccept = () => {
    // Lógica para manejar la acción de aceptar en PublishForm
    setShowFormModal(false);
    setUpdateFlag(!updateFlag);
  };

  const handleFormCancel = () => {
    // Lógica para manejar la acción de cancelar en PublishForm
    setShowFormModal(false);
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
    <div className="gestor-admin-container">
      <button onClick={handleCreate} className="create-button">
        Crear nuevo gestor
      </button>
      <Table data={gestors} columns={columns} updateFlag={updateFlag} />

      <Modal
        isOpen={showFormModal}
        onRequestClose={handleFormCancel}
        contentLabel="Formulario"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <GestorForm
          isCreating={isCreating}
          gestorId={selectedGestorId}
          onAccept={handleFormAccept}
          onCancel={handleFormCancel}
        />
      </Modal>
    </div>
  );
};

export default GestorAdmin;
