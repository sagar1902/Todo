import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();
    useEffect(()=>{if(localStorage.getItem('user_id')){navigate('/')}});
    const login = async () => {
        let result = await fetch('http://localhost:8000/loginapi/login', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            //mode: 'no-cors',
            body: JSON.stringify({ username, password })
        });
        result = await result.json();
        if (!result.error) {
            localStorage.setItem('user_id', result.id)
        }
        navigate('/');
    }

    const register = async () => {
        let result = await fetch('http://localhost:8000/loginapi/register', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            //mode: 'no-cors',
            body: JSON.stringify({ username, password })
        });
        result = await result.json();
        if(!result.error){
            if(result.message==='done'){alert('login now');}
        }else{console.log(result.error)}
    }

    return (
        <div className="login">
            <div className="input-group mb-3" style={{ width: '40%' }}>
                <span className="input-group-text" id="basic-addon1">Username</span>
                <input type="text" className="form-control" value={username ? username : ''} aria-label="Title" aria-describedby="basic-addon1" onChange={(e) => { setUsername(e.target.value) }} />
            </div>
            <div className="input-group mb-3" style={{ width: '40%' }}>
                <span className="input-group-text" id="basic-addon1">Password</span>
                <input type="password" className="form-control" value={password ? password : ''} aria-label="Title" aria-describedby="basic-addon1" onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            <button type="button" className="btn btn-danger" onClick={() => { login() }}>Login</button>
            <button type="button" className="btn btn-danger" onClick={() => { register() }}>Register</button>
        </div>
    )
}