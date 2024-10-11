import React, { useState } from 'react';
import Countdown from './Countdown';
import './TeamInput.css';

const TeamInputPage = ({ onSubmit }) => {
  const [teamNumber, setTeamNumber] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(teamNumber);

    // Check if the number is divisible by 2
    if (num % 2 === 0) {
      onSubmit(num); // Pass the number to the parent component
    } else {
      alert("Please enter a number divisible by 2.");
    }
  };

  return (
    <div className="input-page-container">
      <h1 className="app-title">Pickleball Tournament App</h1>
      <form onSubmit={handleSubmit} className="team-form">
        <label className="team-input-label">
          Enter number of teams:
        </label>
        <input
          type="number"
          value={teamNumber}
          onChange={(e) => setTeamNumber(e.target.value)}
          className="team-input"
          min="2"
          required
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <Countdown />
    </div>
  );
};

export default TeamInputPage;
