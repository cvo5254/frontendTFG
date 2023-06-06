import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Table from "../Table/Table";
import EditEmergencyForm from "./EditEmergencyForm/EditEmergencyForm";
import Modal from "react-modal";

const EmergenciesAdmin = () => {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [showPublishForm, setShowPublishForm] = useState(false);
  const [selectedEmergencyId, setSelectedEmergencyId] = useState("");
  const [selectedChannelId, setSelectedChannelId] = useState("");

  const getEmergencies = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/allemergencies/");
      const data = await response.json();
      const emergencies = data.map((emergency) => ({
        id: emergency.id,
        Titulo: emergency.title,
        Decripcion: emergency.description,
        Canal: emergency.channel?.nombre || "",
        Estado: emergency.is_published,
        Acciones: (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() =>
                handlePublishClick(emergency.id, emergency.channel?.id)
              }
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => handleDelete(emergency.id)}
            >
              Eliminar
            </Button>
          </>
        ),
      }));
      setEmergencies(emergencies);
      console.log(emergencies);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEmergencies();
  }, [updateFlag]);

  const handlePublishClick = (emergencyId, channelId) => {
    setSelectedEmergencyId(emergencyId);
    console.log(channelId);
    setSelectedChannelId(channelId);
    setShowPublishForm(true);
  };

  const handlePublishFormAccept = () => {
    // Lógica para manejar la acción de aceptar en PublishForm
    setShowPublishForm(false);
    setUpdateFlag(!updateFlag);
  };

  const handlePublishFormCancel = () => {
    // Lógica para manejar la acción de cancelar en PublishForm
    setShowPublishForm(false);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/${id}/deleteEmergency/`, {
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
    { field: "Titulo", headerName: "Titulo", width: 200 },
    { field: "Decripcion", headerName: "Descripcion", width: 200 },
    { field: "Canal", headerName: "Canal", width: 200 },
    { field: "Estado", headerName: "Estado", width: 200 },
    { field: "Acciones", headerName: "Acciones", width: 200 },
  ];

  return (
    <div>
      <Modal
        isOpen={showPublishForm}
        onRequestClose={handlePublishFormCancel}
        contentLabel="Formulario"
        className="modal-edit"
        overlayClassName="modal-edit-overlay"
      >
        <EditEmergencyForm
          emergencyId={selectedEmergencyId}
          channelId={selectedChannelId}
          onAccept={handlePublishFormAccept}
          onCancel={handlePublishFormCancel}
        />
      </Modal>
      <Table data={emergencies} columns={columns} updateFlag={updateFlag} />
    </div>
  );
};

export default EmergenciesAdmin;
