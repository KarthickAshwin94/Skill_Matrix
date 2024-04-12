import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", { username: username,  password: password });
            const user_type = response.data.user_type;
            const is_approver=response.data.is_approver;
            setUsername(username); // Set the username state
          
            if (user_type === 'admin') {
                
                navigate('/admin', { state: { username } });
            } else if((user_type === 'user')&&(is_approver===false))  {
            
                navigate('/user', { state: { username } }); // Pass username as state when navigating to UserDashboard
            }
            else if((user_type==='user')&&(is_approver===true))
            {
                if(username==='Christopher')
                {
                    navigate('/skill-approval',{ state: { username } });
                }
                else if(username==='Arun')
                {
                    navigate('/certification-approval',{state:{username}});
                }
                else if(username==='Ganesh')
                {
                    navigate('/project-approval',{state:{username}})
                }
            }
            
            
        } catch (error) {
            console.error('Login failed:', error.response.data.message);
        }
    };

    return (
        <div className="login-page"> 
            <h2>Login</h2>
            <form className="login-container" onSubmit={handleLogin}>
                <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" autoComplete="current-password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Login</button>
            </form>
            <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
            
            </div> 
    );
};

export default LoginPage;
