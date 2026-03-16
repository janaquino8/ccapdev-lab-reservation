import { useState } from 'react';
import LPInput from '../../../components/LPInput/LPInput';
import LPButton from '../../../components/LPButton/LPButton';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async () => {
        setErrorMessage('');
        setSuccessMessage('');

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        if (!email.includes("@dlsu.edu.ph")) {
            setErrorMessage("Please use a valid DLSU email address.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Account created successfully! Redirecting to login...");
                setTimeout(() => {
                    navigate('/');   
                }, 2000);
            } else {
                setErrorMessage(data.error || data.errorr || "Registration failed.");
            }
        } catch (error) {
            console.error("Network error:", error);
            setErrorMessage("Could not connect to the server.");
        }
    }

    const handleLogin = (e) => {
        e.preventDefault(); 
        navigate('/');   
    }

    return (
        <div className="register">
            <div className="overlay">
                <div className="content-wrapper">
                    <div className="card1">
                        <h2>Register</h2>
                        
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                        <div className="content-card">
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
                            /> <br />
                            <LPInput 
                                label="Confirm Password" 
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <LPButton text="Register" variant="primary" onClick={handleRegister} />

                        <a href="/" className="signup" onClick={handleLogin}>Already have an account? Log in.</a>
                    </div>

                    <div className="right">
                        <header className="headertext">
                            <h1>Welcome to DLSU</h1>
                            <h1>Computer Laboratories</h1>
                        </header>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;