import React, { useEffect, useState } from "react";
import axios from "axios";
import "./assets/styles/bulma.min.css";
import "./assets/styles/EndGame.css"

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const EndGame = () => { 
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        getPlayers();
    }, []);

    const getPlayers = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/leaderboard/api/players/");
            const playersData = response.data.map(player => player.name);
            setPlayers(playersData);
        } catch (error) {
            console.error(error);
        }
    }

    const rows = players.map((name, index) => (
        <React.Fragment key={name}>
            <label htmlFor={`${name}-amount`}>{name}</label>
            <input className="input" type="number" id={`${name}-amount`} placeholder={`Enter final amount for ${name}`} />
        </React.Fragment>
    ));

    return (
        <section className="section">
            <div className="container">
                <h1 className="title">End Game</h1>
                <form className="form" action="/leaderboard/start_game/" method="post">
                    <input type="hidden" name="csrfmiddlewaretoken" />
                    <div className="field">
                        <label className="label">Enter the Final Amount for each Player:</label>
                        <div className="control input-amounts-div">
                            { rows }
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-success" type="submit">End Game</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}
