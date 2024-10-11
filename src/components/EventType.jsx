import React, { useState } from 'react';
import InputComponent from './InputComponent';
import "../App.css";

const EventType = () => {
  const [teams, setTeams] = useState([]);

  const addTeam = (team) => {
    setTeams([...teams, team]);
  };

  const deleteTeam = (indexToDelete) => {
    setTeams(teams.filter((team, index) => index !== indexToDelete));
  };

  const generateMatchups = (teams) => {
    const matchups = [];
    const numTeams = teams.length;

    for (let i = 0; i < numTeams / 2; i++) {
      matchups.push([teams[i], teams[numTeams - 1 - i]]);
    }
    return matchups;
  };

  const renderBracket = (teams) => {
    if (teams.length <= 1) return null;

    const matchups = generateMatchups(teams);

    return (
      <div className="bracket-round">
        {matchups.map((matchup, index) => (
          <div key={index} className="matchup">
            <div className="team">{matchup[0]}</div>
            <div className="vs">vs</div>
            <div className="team">{matchup[1]}</div>
          </div>
        ))}
        {teams.length > 2 && (
          <div className="next-round">
            {renderBracket(matchups.map(match => match[0]))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app-container">
      <div className="left-side">
        <h1>Bracketing App</h1>
        <InputComponent addTeam={addTeam} />
      </div>

      <div className="right-side">
        <h2>Teams</h2>
        <div className="team-list-container">
          {teams.length > 0 && (
            <ul className="team-list">
              {teams.map((team, index) => (
                <li key={index} className="team-item">
                  {team}
                  <button
                    className="delete-button"
                    onClick={() => deleteTeam(index)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {teams.length >= 4 && (
          <div className="bracket-container">
            <h2>Bracket</h2>
            {renderBracket(teams)}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventType;
