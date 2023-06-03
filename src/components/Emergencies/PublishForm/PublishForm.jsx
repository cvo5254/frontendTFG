import React from "react";
import { useState, useEffect } from "react";
import "./PublishForm.css";

const PublishForm = ({ emergencyId, channelId, onAccept, onCancel }) => {
  const [selectedOption, setSelectedOption] = useState(channelId || "");
  const [channels, setChannels] = useState([]);

  const handleAccept = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/${emergencyId}/publish`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            channel_id: selectedOption,
          }),
        }
      );
      console.log(response);
      onAccept();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    const getChannels = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/getChannels/");
        const data = await response.json();
        setChannels(data);

        if (channelId) {
          setSelectedOption(channelId.toString());
        }
      } catch (error) {
        console.error(error);
      }
    };

    getChannels();
  }, []);

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
        {channels.map((channel) => (
          <option key={channel.id} value={channel.id}>
            {channel.nombre}
          </option>
        ))}
      </select>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default PublishForm;
