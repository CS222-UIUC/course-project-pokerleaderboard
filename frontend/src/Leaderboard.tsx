import React, { useState } from "react";
import axios from "axios";
import "./assets/styles/bulma.min.css";

// Two default xsrf token headers for axios. 
// These headers are used to protect against CSRF (Cross-Site Request Forgery) attacks.
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

// The Leaderboard page component
export const Leaderboard = () => { 
    // State to hold the data of each Player
    const [playerData, setPlayerData] = useState([
        {
            "name": "Daniel",
            "curr_amount": 114.0,
            "peak_amount": 126
        },
        {
            "name": "Yejun",
            "curr_amount": 10.0,
            "peak_amount": 10
        },
        {
            "name": "Pedro",
            "curr_amount": 0.0,
            "peak_amount": 0
        },
        {
            "name": "Koki",
            "curr_amount": 0.0,
            "peak_amount": 0
        },
        {
            "name": "Justin",
            "curr_amount": -25.0,
            "peak_amount": 2
        }
    ]);

    let rows = [];

    // Creating rows to display Player data and the option to remove the Player
    playerData.forEach(data =>
        rows.push(
            <tr>
                <td>{ data["name"] }</td>
                <td>{ data["curr_amount"] }</td>
                <td>{ data["peak_amount"] }</td>
                <td>
                <div className="buttons" style={{ "display": "flex", "justifyContent": "center" }}>
                    <button className="button is-danger is-small is-outlined remove-button">Remove</button>
                </div>
                </td>
            </tr>
        )
    );

    return (
        <section className="section">
            <div className="container">
                <h1 className="title">Poker Leaderboard</h1>
                <table className="table is-striped is-hoverable is-fullwidth" style={{ "textAlign": "center" }}>
                    <thead>
                        <tr>
                            <th style={{ "textAlign": "center" }}>Name</th>
                            <th style={{ "textAlign": "center" }}>Current Amount</th>
                            <th style={{ "textAlign": "center" }}>Peak Amount</th>
                            <th style={{ "textAlign": "center" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    { rows }
                    </tbody>
                </table>
                <form className="form" id="add-form">
                    <div className="field">
                        <label className="label" htmlFor="" id="name-input">Name</label>
                        <div className="control">
                            <input className="input" type="text" id="name-input" placeholder="Name" />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button className="button is-link" type="submit">Add Player</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}