import React, { useEffect, useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { getSettings, updateSettings } from '../../services/SettingsServices';
import Menu from "../../components/Menu/Menu";
import { doLogout } from "../../services/AuthService";
import Symbols from "./Symbols";

function Settings() {

    const inputEmail = useRef('');
    const inputNewPassword = useRef('');
    const inputConfirmPassword = useRef('');
    const inputApiUrl = useRef('');
    const inputStreamUrl = useRef('');
    const inputAccessKey = useRef('');
    const inputSecretKey = useRef('');

    const history = useHistory();

    /**
     * estates
     */
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        getSettings(token)
            .then(settings => {
                inputEmail.current.value = settings.email;
                inputApiUrl.current.value = settings.apiUrl;
                inputStreamUrl.current.value = settings.streamUrl;
                inputAccessKey.current.value = settings.accessKey;
            })
            .catch(err => {
                if (err.response && err.response.status === 401)
                    return history.push('/');
                if (err.response)
                    setError(err.response.data);
                else
                    setError(err.message);
            })
    }, []);

    function onLogoutClick(event) {
        const token = localStorage.getItem('token');
        doLogout(token)
            .then(response => {
                localStorage.removeItem('token');
                history.push('/');
            })
            .catch(err => {
                setError(err.message);
            })
    }

    function onFormSubmit(event) {
        event.preventDefault();
        if ((inputNewPassword.current.value || inputConfirmPassword.current.value)
            && inputNewPassword.current.value !== inputConfirmPassword.current.value) {
            return setError('As senhas não conferem, tente novamente.');
        }

        const token = localStorage.getItem('token');
        updateSettings({
            email: inputEmail.current.value,
            password: inputNewPassword.current.value ? inputNewPassword.current.value : null,
            apiUrl: inputApiUrl.current.value,
            streamUrl: inputStreamUrl.current.value,
            accessKey: inputAccessKey.current.value,
            secretKey: inputSecretKey.current.value ? inputSecretKey.current.value : null,
        }, token)
            .then(result => {
                if (result) {
                    setError('');
                    setSuccess('As configurações foram atualizadas com sucesso.');
                    inputSecretKey.current.value = '';
                    inputNewPassword.current.value = '';
                    inputConfirmPassword.current.value = '';
                } else {
                    setSuccess('');
                    setError('Não foi possivel atualizar as configurações');
                }
            })
            .catch(error => {
                setSuccess('');
                console.error(error.message);
                setError('Não foi possivel atualizar as configurações');
            });
    }

    return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <h1 className="h4">Configurações</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-body border-0 shadow mb-4">
                            <form>
                                <h2 className="h5 mb-4">Informações Gerais</h2>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input ref={inputEmail} className="form-control" id="email" type="email" placeholder="example@gmail.com" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div>
                                            <label htmlFor="newPassword">Nova Senha</label>
                                            <input ref={inputNewPassword} className="form-control" id="newPassword" type="password" placeholder="Informe sua nova senha" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div>
                                            <label htmlFor="confirmPassword">Confirma Senha</label>
                                            <input ref={inputConfirmPassword} className="form-control" id="confirmPassword" type="password" placeholder="Informe sua nova senha" />
                                        </div>
                                    </div>
                                </div>
                                <h2 className="h5 mb-4">Informações da Corretora</h2>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="apiUrl">URL API</label>
                                            <input ref={inputApiUrl} className="form-control" id="apiUrl" type="text" placeholder="URL da api" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="streamUrl">URL Stream (Web Sockets)</label>
                                            <input ref={inputStreamUrl} className="form-control" id="streamUrl" type="text" placeholder="URL de Stream" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="accessKey">Chave de Acesso</label>
                                            <input ref={inputAccessKey} className="form-control" id="accessKey" type="text" placeholder="Sua chave de acesso" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="secretKey">Chave Secreta</label>
                                            <input ref={inputSecretKey} className="form-control" id="secretKey" type="password" placeholder="Sua chave secreta" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
                                        <div className="col-sm-3">
                                            <button className="btn btn-gray-800 mt-2 animate-up-2" type="submit" onClick={onFormSubmit}>Salvar Alterações</button>
                                        </div>
                                        {
                                            error
                                                ? <div className="alert alert-danger mt-2 col-9 py-2">{error}</div>
                                                : <React.Fragment></React.Fragment>
                                        }
                                        {
                                            success
                                                ? <div className="alert alert-success mt-2 col-9 py-2">{success}</div>
                                                : <React.Fragment></React.Fragment>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
             <Symbols/>   
            </main>
        </React.Fragment>
    );
}

export default Settings;