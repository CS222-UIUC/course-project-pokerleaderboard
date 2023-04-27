import React, { useState } from "react"
import "./assets/styles/App.css";
import { EndGame } from "./EndGame";
import { Leaderboard } from "./Leaderboard";
import { Login } from "./Login";
import { Register } from "./Register";
import { StartGame } from "./StartGame";

const App = () => {

  // State to hold current page (Login/Register)
  const [currentForm, setCurrentForm] = useState('login');
  const [authenticated, setAuthenticated] = useState(true);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const toggleForm = (formName, selectedPlayers?) => {
    setSelectedPlayers(selectedPlayers);

    setCurrentForm(formName);
    if (formName === 'login' || formName === 'register') {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }

  return (
    <div className={ authenticated ? "App-auth" : "App-unauth" }>
      {
      (() => {
        if (currentForm === "login") {
          return <Login onFormSwitch={toggleForm} />;
        } else if (currentForm === "register") {
          return <Register onFormSwitch={toggleForm} />;
        } else if (currentForm === "startGame") {
          return <StartGame onFormSwitch={toggleForm}/>;
        } else if (currentForm == "endGame") {
          return <EndGame onFormSwitch={toggleForm} selectedPlayers={selectedPlayers}/>;
        } else if (currentForm == "leaderboard") {
          return <Leaderboard onFormSwitch={toggleForm}/>;
        } 

      })()
      }
        
    </div>
  );
}

export default App;