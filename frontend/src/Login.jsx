import React, { useState } from "react"
import card from './card.png'
import axios from "axios"

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const Login = (props) => {
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post("http://127.0.0.1:8000/api/auth/login", {
            username: username,
            password: password
        })
        console.log(response)
    }

    return (
        <div className="auth-form-container">
            <img src={card} alt="logo" className="logo"></img>
            <h1>Poker Leaderboard</h1>
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label for="username">Username</label>
                <input value={username} onChange={(e) => setUser(e.target.value)} type="username" placeholder="Username" id="username" name="username"  />
                <label for="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                <button type="submit" target="_blank">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register Here.</button>
        </div>
    )
}