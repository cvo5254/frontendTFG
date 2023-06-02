import React from "react";
import { useState } from "react";
import "./PublishForm.css";

const PublishForm = ({ emergencyId, channelId }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleAccept = () => {
    // Lógica para manejar la acción de aceptar
  };

  const handleCancel = () => {
    // Lógica para manejar la acción de cancelar
  };

  return (
    <div className="publish-form-container">
      <h2>Publish Form</h2>
      <label htmlFor="channel-dropdown">Select Channel:</label>
      <select
        id="channel-dropdown"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="">Select Channel</option>
        {/* Renderizar opciones de canal si channelId está disponible */}
        {channelId && <option value={channelId}>Channel {channelId}</option>}
      </select>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default PublishForm;
