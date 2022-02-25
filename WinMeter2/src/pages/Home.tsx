import { FormEvent, useState } from "react";

import googleLogo from '../assets/images/google-logo.svg'

import '../styles/home.scss'

/* Usar tanto o google para autenticação quanto um login próprio usando Firebase */


export function Home() {
    const [signUp, setSignUp] = useState('container')

    function handleAnimation(e: FormEvent) {
        e.preventDefault()

        const buttonId = e.currentTarget.id

        if (buttonId != 'signUp') return setSignUp('container')
       
        setSignUp('container right-panel-active')
    }

    function handleFormSubmit(e: FormEvent) {
        e.preventDefault()
    }


    return (
        <div className="Home">
            <div className={signUp} id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={handleFormSubmit}>
                        <h1>Criar Conta</h1>
                        <div className="social-container">
                            <button className="social googleButton"><img src={googleLogo} alt="googleLogo" />Google</button>
                        </div>
                        <span>ou use seu email para se registrar</span>
                        <input type="text" name="text" placeholder="Nome" />
                        <input type="email" name="email" placeholder="Email" />
                        <input type="password" name="password" placeholder="Senha" />
                        <button type="submit">Cadastrar-se</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Entrar</h1>
                        <div className="social-container">
                            <button className="social googleButton"><img src={googleLogo} alt="googleLogo" />Google</button>
                        </div>
                        <span>ou use sua conta</span>
                        <input type="email" name="email" placeholder="Email" />
                        <input type="password" name="password" placeholder="Senha" />
                        <a href="#">Esqueceu sua senha?</a>
                        <button>Entrar</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Olá novamente!</h1>
                            <p>Para se manter conectado conosco, por favor, logue com sua conta pessoal</p>
                            <button className="ghost" onClick={handleAnimation} id="signIn">Entrar</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Olá, Amigo!</h1>
                            <p>Entre com seus dados pessoais e comece uma jornada conosco</p>
                            <button className="ghost" onClick={handleAnimation} id="signUp">Cadastrar-se</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}