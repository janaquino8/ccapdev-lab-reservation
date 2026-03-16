import { useState } from 'react';
import LPInput from '../../../components/LPInput/LPInput';
import LPButton from '../../../components/LPButton/LPButton';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful! (Status 200)
                console.log("Logged in user:", data);
                navigate('/home');
            } else {
                // Login failed (Status 400, 401, 404)
                setErrorMessage(data.error || "Login failed.");
            }
        } catch (error) {
            console.error("Network error:", error);
            setErrorMessage("Could not connect to the server.");
        }
    }

    const handleAdminLogin = () => {
        navigate('/admin/home');   
    }

    return (
        <div className="login">
            <div className="overlay">
                <div className="content-wrapper">
                    <div className="left">
                        <header className="headertext">
                            <h1>Welcome to DLSU</h1>
                            <h1>Computer Laboratories</h1>
                        </header>
                    </div>
                    
                    <div className="card">
                        <h2>Login</h2>

                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                        <LPInput 
                            label="DLSU Email" 
                            type="text" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        /> <br />
                        <LPInput 
                            label="Password" 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />

                        <LPButton text="Login" variant="primary" onClick={handleLogin} />
                        <input type="checkbox" className="remember"/> <span className="rememberme">Remember me</span>

                        <a href="/register" className="signup">Don't have an account? Sign up.</a>

                        <div className="tempAdmin">
                            <LPButton text="Login as Admin" variant="primary" onClick={handleAdminLogin} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;