import React, { useEffect, useState } from "react";
import axios from "axios";
import { Transfer } from "antd";
import "./assets/styles/bulma.min.css";
import "./assets/styles/StartGame.css"

// Two default xsrf token headers for axios. 
// These headers are used to protect against CSRF (Cross-Site Request Forgery) attacks.
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

// The StartGame page component
export const StartGame = () => { 
    const [deselectedPlayers, setDeselectedPlayers] = useState([]); 
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    // The useEffect hook is used to fetch the list of players when the component mounts.
    useEffect(() => {
        getPlayers();
    }, []);

    // This function sets the list of players by creating an array of objects containing the player names.
    const getPlayers = () => {
        let ls = [];
        let players = [
            "Daniel",
            "Yejun",
            "Justin",
            "Pedro"
        ];
        players.forEach((name, index) => {
            let data = {
                "key": name,
            };
            ls.push(data);
        });
        setDeselectedPlayers(ls);
    }

    // This function updates the state of the selected players whenever a player is selected or deselected.
    const handleChange = (selectedPlayers) => {
        setSelectedPlayers(selectedPlayers);
    };

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
                        <input className="input" id="buy-in" name="buy-in" type="number" />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                        <button className="button is-success" type="submit">Start Game</button>
                        </div>
                    </div>
                    </form>
            </div>
        </section>
    )
}