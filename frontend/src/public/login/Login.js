import React, { useState } from 'react';
import {useHistory } from 'react-router-dom';
import { doLogin } from '../../services/AuthService';
import Footer from './Footer';

function Login() {
    const year = process.env.REACT_APP_YEAR;
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function onChangeInput(event) {
        if (event.target.id === 'email') {
            setEmail(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    function onSubmit(event) {
        event.preventDefault();

        doLogin(email, password)
            .then(reponse => {
                if (reponse) {
                    localStorage.setItem('token', reponse.token);
                    history.push('/dashboard');
                }
            })
            .catch(err => {
                console.error(err);
                setError('Usuário ou senha inválido.');
            });
    }

    return (
        <main>
            <section className='vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center'>
                <div className='container'>
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <div className="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                            <div className='text-center'>
                                <img src='/img/favicon/mstile-150x150.png' alt='CRIP-T' width={64} />
                            </div>
                            <div className="text-center text-md-center mb-3 mt-md-0">
                                <h5 className="mb-0 h5">V-Cripto Trading Bot</h5>
                                <small>version 1.0.1</small>
                            </div>
                            <form action="#" className="mt-4" onSubmit={onSubmit}>
                                <div className="form-group mb-4">
                                    <div className="input-group">
                                        <span className="input-group-text" id="email">
                                            <svg className="icon icon-xs text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                        </span>
                                        <input type="email" className="form-control" placeholder="E-mail" id="email" required onChange={onChangeInput} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-group mb-4">
                                        <div className="input-group">
                                            <span className="input-group-text" id="password">
                                                <svg className="icon icon-xs text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                                            </span>
                                            <input type="password" placeholder="Senha" className="form-control" id="password" required onChange={onChangeInput} />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-gray-800" >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-xs me-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                                        </svg>
                                        Fazer Login</button>
                                </div>
                                {
                                    error ?
                                        <div className="alert alert-danger mt-2">{error}</div>
                                        : <React.Fragment></React.Fragment>
                                }
                            </form>
                            <div className="text-center text-md-center mb-0 mt-3">
                                <small>
                                    Powered by <b className='name'>Niu Soluções</b> - {year}
                                </small>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Login;