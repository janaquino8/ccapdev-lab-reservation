import LPInput from '../../../components/LPInput/LPInput';
import LPButton from '../../../components/LPButton/LPButton';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('./home');   
    }

    const handleAdminLogin = () => {
        navigate('./admin/home');   
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
                        <LPInput label="Student Number" type="text" /> <br />
                        <LPInput label="Password" type="password" />

                        <LPButton text="Login" variant="primary" onClick={handleLogin} />
                        <input type="checkbox" className="remember"/> <span className="rememberme">Remember me</span>

                        <a href="/register" className="signup">Sign up</a>

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