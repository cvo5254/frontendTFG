import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Table from "../Table/Table";

const Publish = () => {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateFlag, setUpdateFlag] = useState(false);

  const getEmergencies = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/allemergencies/?is_published=False"
      );
      const data = await response.json();
      const emergencies = data.map((emergency) => {
        const descripcion = emergency.description ? emergency.description : "";
        const canal = emergency.channel ? emergency.channel.nombre : "";

        return {
          id: emergency.id,
          Titulo: emergency.title,
          Decripcion: descripcion,
          Canal: canal,
          Estado: emergency.is_published,
          Acciones: (
            <>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handlePublish(emergency.id)}
              >
                Activar
              </Button>
            </>
          ),
        };
      });
      setEmergencies(emergencies);
      console.log(emergencies);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEmergencies();
  }, [updateFlag]); // Se ejecuta solo una vez al inicializar el componente

  const handlePublish = async (emergencyId) => {
    try {
      // Realizar la petición PUT para activar el usuario
      await fetch(`http://localhost:8000/api/${emergencyId}/publish`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Volver a realizar la solicitud para obtener los usuarios actualizados
      setUpdateFlag(!updateFlag);
      console.log("Publicar la emergencia con ID:", emergencyId);
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
    { field: "id", headerName: "ID", width: 200 },
    { field: "Titulo", headerName: "Titulo", width: 200 },
    { field: "Decripcion", headerName: "Descripcion", width: 200 },
    { field: "Canal", headerName: "Canal", width: 200 },
    { field: "Estado", headerName: "Estado", width: 200 },
    { field: "Acciones", headerName: "Acciones", width: 200 },
  ];

  return (
    <div>
      <Table data={emergencies} columns={columns} updateFlag={updateFlag} />
    </div>
  );
};

export default Publish;
