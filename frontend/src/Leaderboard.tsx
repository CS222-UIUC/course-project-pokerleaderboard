import React, { useState, useEffect } from "react";
import "./assets/styles/bulma.min.css";

export const Leaderboard = ({ onFormSwitch }) => {
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/leaderboard/api/players/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setPlayerData(data));
  }, []);

  const handleRemovePlayer = (id) => {
    fetch(`http://127.0.0.1:8000/leaderboard/api/players/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setPlayerData(playerData.filter((player) => player.id !== id));
    });
  };

  const handleAddPlayer = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
  
    fetch("http://127.0.0.1:8000/leaderboard/api/players/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        current_amount: 0,
        peak_amount: 0
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPlayerData([...playerData, data]);
        event.target.reset();
      });
  };

  let rows = [];
  playerData.forEach((data) =>
    rows.push(
      <tr key={data.id}>
        <td>{data.name}</td>
        <td>{data.current_amount}</td>
        <td>{data.peak_amount}</td>
        <td>
          <div
            className="buttons"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button
              className="button is-danger is-small is-outlined remove-button"
              onClick={() => handleRemovePlayer(data.id)}
            >
              Remove
            </button>
          </div>
        </td>
      </tr>
    )
  );
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Poker Leaderboard</h1>
        <table
          className="table is-striped is-hoverable is-fullwidth"
          style={{ textAlign: "center" }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Current Amount</th>
              <th style={{ textAlign: "center" }}>Peak Amount</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <form className="form" id="add-form" onSubmit={handleAddPlayer}>
          <div className="field">
            <label className="label" htmlFor="" id="name-input">
              Name
            </label>
            <div className="control">
            <input
              className="input"
              type="text"
              id="name-input"
              name="name"
              placeholder="Name"
            />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-link" type="submit">
                Add Player
              </button>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-link" type="submit" onClick={() => onFormSwitch('startGame')}>
                Play Again?
              </button>
            </div>
          </div>

        </form>
      </div>
    </section>
  );
};

