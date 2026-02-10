import LPInput from '../../../components/LPInput/LPInput';
import LPButton from '../../../components/LPButton/LPButton';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/');   
    }

    const handleLogin = () => {
        navigate('/');   
    }

    return (
        <div className="register">
            <div className="overlay">
                <div className="content-wrapper">
                    <div className="card1">
                        <h2>Register</h2>
                        
                        <div className="content-card">
                            <LPInput label="Student Number" type="text" /> <br />
                            <LPInput label="Password" type="password" /> <br />
                            <LPInput label="Confirm Password" type="confirmpassword" />
                        </div>

                        <LPButton text="Register" variant="primary" onClick={handleRegister} />

                        <a key="login" href="/" className="signup" onClick={handleLogin}>Already have an account?</a>
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