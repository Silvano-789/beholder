import React from 'react';
import {Route, BrowserRouter, Redirect } from 'react-router-dom';
import Login from './public/login/Login';

function Routes(){
    return (
        <BrowserRouter>
            <Route path="/" exact>
                <Login />
            </Route>
        </BrowserRouter>
    );
}

export default Routes;