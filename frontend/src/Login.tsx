import React, { useState } from "react";
import axios from "axios";
import card from "./assets/images/card.png";
import './assets/styles/auth.css';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

interface IProps {
    onFormSwitch: Function;
}

export const Login = ({ onFormSwitch }: IProps) => {
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
                <label htmlFor="username">Username</label>
                <input value={username} onChange={(e) => setUser(e.target.value)} type="username" placeholder="Username" id="username" name="username"  />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                <button type="submit" onClick={() => onFormSwitch('startGame')}>Log In</button>
            </form>
            <button className="link-btn" onClick={() => onFormSwitch('register')}>Don't have an account? Register Here.</button>
        </div>
    )
}