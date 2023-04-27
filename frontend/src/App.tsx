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

  // State to hold auth status of user
  const [authenticated, setAuthenticated] = useState(true);

  // Function to switch between Login and Register
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className={ authenticated ? "App-auth" : "App-unauth" }>
      {
        // currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm} />
      
        <EndGame />

      }
      <Leaderboard />
    </div>
  );
}

export default App;