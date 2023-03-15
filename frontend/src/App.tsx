import React, { useState } from "react"
import "./assets/styles/App.css";
import { EndGame } from "./EndGame";
import { Leaderboard } from "./Leaderboard";
import { Login } from "./Login";
import { Register } from "./Register";
import { StartGame } from "./StartGame";

const App = () => {
  const [currentForm, setCurrentForm] = useState('login');
  const [authenticated, setAuthenticated] = useState(false);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className={ authenticated ? "App-unauth" : "App-auth" }>
      {
      
        //currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm} />
      
        <EndGame />
      }
    </div>
  );
}

export default App;