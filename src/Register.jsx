import React, { useState } from "react"

export const Register = (props) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label for="name">Full Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Yejun" id="name" name="name"  />
                <label for="username">Username</label>
                <input value={user} onChange={(e) => setUser(e.target.value)} type="username" placeholder="yayjune" id="username" name="username"  />
                <label for="password">Password</label>
                <input value={pass}onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                <button>Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    )
}