import React, { useState } from "react"
import card from './card.png'

export const Login = (props) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    }

    return (
        <div className="auth-form-container">
            <img src={card} alt="logo" className="logo"></img>
            <h1>Poker Leaderboard</h1>
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label for="username">Username</label>
                <input value={user} onChange={(e) => setUser(e.target.value)} type="username" placeholder="yayjune" id="username" name="username"  />
                <label for="password">Password</label>
                <input value={pass}onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                <button>Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register Here.</button>
        </div>
    )
}