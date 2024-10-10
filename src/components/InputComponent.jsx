import React, { useState } from 'react';
import './InputComponent.css';  // We will style this component

const InputComponent = ({ addTeam }) => {
  const [team, setTeam] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (team) {
      addTeam(team);
      setTeam(''); // Reset input field
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-container">
      <input 
        type="text" 
        placeholder="Enter team/player" 
        value={team} 
        onChange={(e) => setTeam(e.target.value)} 
        className="team-input"
      />
      <button type="submit" className="add-button">Add Team</button>
    </form>
  );
};

export default InputComponent;
