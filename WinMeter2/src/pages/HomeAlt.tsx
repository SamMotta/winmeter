import { useNavigate } from 'react-router-dom';

import { useAuth } from "../hooks/useAuth";
import googleLogo from '../assets/images/google-logo.svg'

import '../styles/home-alt.scss'

/* Usar tanto o google para autenticação quanto um login próprio usando Firebase */


export function HomeAlt() {

    const { user, signInWithGoogle } = useAuth()
    const navigate = useNavigate()

    async function handleLogin() {
        if(!user) {
            await signInWithGoogle()
        }

        navigate('/newMatch')  
    }

    return (
        <div className="Home">
            <div id="container">
                <div className="form-container sign-in-container">
                    <form>
                        <h1>Entrar</h1>
                        <p>Entre com sua conta do google</p>
                        <div className="social-container">
                            <button type="button" onClick={handleLogin} className="social googleButton"><img src={googleLogo} alt="googleLogo" />Google</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}