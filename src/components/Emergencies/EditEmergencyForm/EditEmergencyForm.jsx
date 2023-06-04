import React, { useState, useEffect } from "react";
import "./EditEmergencyForm.css";

const EditEmergencyForm = ({ emergencyId, channelId, onAccept, onCancel }) => {
  const [selectedChannel, setSelectedChannel] = useState(channelId || "");
  const [channels, setChannels] = useState([]);
  const [emergency, setEmergency] = useState({
    title: "",
    description: "",
    channel: selectedChannel,
    is_published: false,
  });

  useEffect(() => {
    setSelectedChannel(channelId || "");
  }, [channelId]);

  useEffect(() => {
    const getEmergency = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/${emergencyId}/getEmergency/`
        );
        const data = await response.json();
        setEmergency(data);
      } catch (error) {
        console.error(error);
      }
    };

    getEmergency();
  }, []);

  useEffect(() => {
    const getChannels = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/getChannels/");
        const data = await response.json();
        setChannels(data);

        if (channelId) {
          setSelectedChannel(channelId.toString());
        }
      } catch (error) {
        console.error(error);
      }
    };

    getChannels();
  }, []);

  const handleCancel = () => {
    onCancel();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmergency((prevEmergency) => ({
      ...prevEmergency,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/${emergencyId}/editEmergency/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emergency),
        }
      );
      console.log(response);
      onAccept();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="edit-emergency-form-container " onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={emergency.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Descripción:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={emergency.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="channel">Canal:</label>
        <select
          id="channel"
          value={selectedChannel}
          onChange={(e) => setSelectedChannel(e.target.value)}
        >
          <option value="">Seleccionar Canal</option>
          {channels.map((channel) => (
            <option key={channel.id} value={channel.id}>
              {channel.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="is_published">¿Publicado?:</label>
        <input
          type="checkbox"
          id="is_published"
          name="is_published"
          checked={emergency.is_published}
          onChange={(e) =>
            setEmergency((prevEmergency) => ({
              ...prevEmergency,
              is_published: e.target.checked,
            }))
          }
        />
      </div>
      <button type="submit">Guardar</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default EditEmergencyForm;
