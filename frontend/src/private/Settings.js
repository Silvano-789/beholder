import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { getSettings } from '../services/SettingsServices';
import { doLogout } from '../services/AuthService';
import Menu from "../components/Menu/Menu";

function Settings() {

    const history = useHistory();

    /**
     * estates
     */
    const [error, setError] = useState('');
    const [settings, setSettings] = useState({
        email: '',
        apiUrl: '',
        accessKey: '',
        keySecret: ''
    })

    useEffect(() => {
        const token = localStorage.getItem('token');

        getSettings(token)
            .then(response => {
                setSettings(response);
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

    return (
        <React.Fragment>
            <Menu />
            <main>
                <section className='vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center'>
                    <div className='container'>
                        <p className='text-center'>
                            {
                                error
                                    ? <div className="alert alert-danger">{error}</div>
                                    : <React.Fragment></React.Fragment>
                            }
                        </p>
                    </div>
                </section>
            </main>
        </React.Fragment>
    );
}

export default Settings;