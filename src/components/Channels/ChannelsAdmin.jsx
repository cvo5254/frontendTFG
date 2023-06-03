import { useState, useEffect, useId } from "react";
import { Button } from "@mui/material";
import Table from "../Table/Table";

const ChannelsAdmin = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [channelName, setChannelName] = useState("");
  const handleOpenForm = () => {
    setShowForm(true);
  };

  const getChannels = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/getChannels/");
      const data = await response.json();
      const channels = data.map((channel) => ({
        id: channel.id,
        Nombre: channel.nombre,
        Acciones: (
          <>
            {channel.is_blocked ? (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleUnblock(channel.id)}
              >
                Desbloquear
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleBlock(channel.id)}
              >
                Bloquear
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => handleDelete(channel.id)}
            >
              Eliminar
            </Button>
          </>
        ),
      }));
      setChannels(channels);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getChannels();
  }, [updateFlag]); // Se ejecuta solo una vez al inicializar el componente

  const handleBlock = async (channel_id) => {
    try {
      await fetch(`http://localhost:8000/api/${channel_id}/blockChannel/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUpdateFlag(!updateFlag);
      console.log("Bloquear canal con el ID:", channel_id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnblock = async (channel_id) => {
    try {
      await fetch(`http://localhost:8000/api/${channel_id}/unblockChannel/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUpdateFlag(!updateFlag);
      console.log("Desbloquear canal con el ID:", channel_id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (channel_id) => {
    try {
      await fetch(`http://localhost:8000/api/${channel_id}/deleteChannel/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUpdateFlag(!updateFlag);
      console.log("Eliminar canal con el ID:", channel_id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    try {
      const response = await fetch("http://localhost:8000/api/crear_canal/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: channelName }),
      });

      setShowForm(false);
      setChannelName("");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "Nombre", headerName: "Nombre", width: 200 },
    { field: "Acciones", headerName: "Acciones", width: 200 },
  ];

  return (
    <div>
      <Table data={channels} columns={columns} updateFlag={updateFlag} />
      <button onClick={handleOpenForm}>Crear Canal</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
          <Button type="submit">Aceptar</Button>
        </form>
      )}
    </div>
  );
};

export default ChannelsAdmin;
