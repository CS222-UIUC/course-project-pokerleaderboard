import React from "react";
import axios from "axios";
import "./assets/styles/bulma.min.css";
import "./assets/styles/EndGame.css"

// Two default xsrf token headers for axios. 
// These headers are used to protect against CSRF (Cross-Site Request Forgery) attacks.
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

// The EndGame page component
export const EndGame = () => { 
    // Array to hold Player names
    const players = [
        "Daniel",
        "Yejun",
        "Justin",
        "Pedro"
    ];

    let rows = [];

    // Creating rows with each containing an input to enter the final amount for the corresponding Player
    players.forEach((name, index) => {
        rows.push(
            <>
                <label htmlFor={`${name}-amount`}>
                    {name}
                </label>
                <input className="input" type="number" id={`${name}-amount`} placeholder={`Enter final amount for ${name}`} />
            </>
        );
    });

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