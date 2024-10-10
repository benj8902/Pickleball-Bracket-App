import React, { useState } from 'react';
import InputComponent from './components/InputComponent';
import './App.css';

const App = () => {
  // State to store the list of teams
  const [teams, setTeams] = useState([]);

  // Function to add a new team to the list
  const addTeam = (team) => {
    setTeams([...teams, team]); // Spread the existing teams and add the new one
  };

  // Function to delete a team by its index
  const deleteTeam = (indexToDelete) => {
    setTeams(teams.filter((team, index) => index !== indexToDelete)); // Filter out the team that matches the index
  };

  // Function to generate matchups based on seeding logic (1 vs last, 2 vs second last, etc.)
  const generateMatchups = (teams) => {
    const matchups = []; // Initialize an empty array to hold matchups
    const numTeams = teams.length; // Get the total number of teams

    // Loop to create pairings (1 vs last, 2 vs second last, etc.)
    for (let i = 0; i < numTeams / 2; i++) {
      // Add a pair (a matchup) to the matchups array
      matchups.push([teams[i], teams[numTeams - 1 - i]]);
    }
    return matchups; // Return the created matchups
  };

  // Recursive function to render each round of the bracket
  const renderBracket = (teams) => {
    // Base case: if there's only one team left, stop the recursion (no more matches)
    if (teams.length <= 1) return null;

    // Generate the matchups for the current round
    const matchups = generateMatchups(teams);
    
    // Render the current round of matchups
    return (
      <div className="bracket-round">
        {/* Map over each matchup and display the teams */}
        {matchups.map((matchup, index) => (
          <div key={index} className="matchup">
            <div className="team">{matchup[0]}</div> {/* First team in the matchup */}
            <div className="vs">vs</div> {/* "vs" between the teams */}
            <div className="team">{matchup[1]}</div> {/* Second team in the matchup */}
          </div>
        ))}
        {/* If there are more than 2 teams, recursively render the next round */}
        {teams.length > 2 && (
          <div className="next-round">
            {/* Recursively call renderBracket with the winners of this round (for now, we simulate it) */}
            {renderBracket(matchups.map(match => match[0]))} {/* Simulate the first team in each matchup winning */}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app-container">
      <h1>Bracketing App</h1>
      {/* Component for adding teams to the bracket */}
      <InputComponent addTeam={addTeam} />
      
      {/* Display the list of added teams */}
      <div className="team-list-container">
        {teams.length > 0 && (
          <ul className="team-list">
            {/* Map over each team and render them along with a delete button */}
            {teams.map((team, index) => (
              <li key={index} className="team-item">
                {team} {/* Display the team name */}
                <button 
                  className="delete-button" 
                  onClick={() => deleteTeam(index)} // Delete the team on button click
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Render the bracket if there are at least 4 teams */}
      {teams.length >= 4 && (
        <div className="bracket-container">
          <h2>Bracket</h2>
          {/* Call the renderBracket function to generate and display the bracket */}
          {renderBracket(teams)}
        </div>
      )}
    </div>
  );
};

export default App;
