import { useState, useEffect } from 'react';
import LPInput from '../../../components/LPInput/LPInput';
import LPButton from '../../../components/LPButton/LPButton';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    // auto redirect
    useEffect(() => {
        const verifyCookie = async () => {
            try {
                const response = await fetch('/auth/check', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    navigate('/home');
                }
            } catch (error) {
                console.error("Session check failed.");
            }
        };

        verifyCookie();
    }, [navigate]);

    const handleLogin = async () => {
        setErrorMessage('');

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify({ email: email, password: password, rememberMe: rememberMe }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Logged in user:", data);
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/home');
            } else {
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
                        <input 
                            type="checkbox" 
                            className="remember" 
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        /> 
                        <label htmlFor="rememberMe" className="rememberme" style={{ cursor: 'pointer' }}>
                            Remember me
                        </label>

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