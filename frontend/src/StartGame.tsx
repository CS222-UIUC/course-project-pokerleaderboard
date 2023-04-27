import React, { useEffect, useState } from "react";
import axios from "axios";
import { Transfer } from "antd";
import "./assets/styles/bulma.min.css";
import "./assets/styles/StartGame.css";

// Two default xsrf token headers for axios. 
// These headers are used to protect against CSRF (Cross-Site Request Forgery) attacks.
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const StartGame = ({ onFormSwitch }) => { 

    const [deselectedPlayers, setDeselectedPlayers] = useState([]); 
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [playerIds, setPlayerIds] = useState([]);
    const [buyIn, setBuyIn] = useState(0);

    // The useEffect hook is used to fetch the list of players when the component mounts.
    useEffect(() => {
        getPlayers();
    }, []);

    const handleBuyInChange = (event) => {
        setBuyIn(event.target.value);
    }

    const getPlayers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/leaderboard/api/players/');
            const players = response.data.map(({ name }) => ({ key: name }));
            const ids = response.data.map(({ id }) => ({ key: id }));
            setDeselectedPlayers(players);
            setPlayerIds(ids);
        } catch (error) {
            console.error(error);
        }
    };


    // This function updates the state of the selected players whenever a player is selected or deselected.
    const handleChange = (selectedPlayers) => {
        setSelectedPlayers(selectedPlayers);
    };

    const handleSubmit = () => {
        fetch("http://127.0.0.1:8000/leaderboard/start_game/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date_time: null,
                id: playerIds,
                buy_in: buyIn,
            }),
        })
        onFormSwitch('endGame', selectedPlayers);
    }

    return (
        <section className="section">
            <div className="container">
                <h1 className="title">Start Game</h1>
                <form className="form" action="/leaderboard/start_game/" method="post">
                    <input type="hidden" name="csrfmiddlewaretoken" />
                    <div className="field">
                        <label className="label">Select Players:</label>
                        <div className="control">
                            <Transfer 
                                dataSource={ deselectedPlayers }
                                showSearch={ true }
                                operations={ ["Select", "Deselect"] }
                                targetKeys={ selectedPlayers }
                                onChange={ handleChange }
                                listStyle={{
                                    "minHeight": "300px"
                                }}
                                render={(item) => `${item.key}`}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="buy-in">Buy-In Amount:</label>
                        <div className="control">
                        <input 
                            className="input"
                            id="buy-in"
                            name="buy-in"
                            type="number"
                            value={buyIn}
                            onChange={handleBuyInChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                        <button className="button is-success" type="submit" onClick={handleSubmit}>I am ready!</button>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                        <button className="button is-success" onClick={() => onFormSwitch('leaderboard')}>View Leaderboard</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};
