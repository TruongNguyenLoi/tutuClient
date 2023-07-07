import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        const token = this.getUrlParameter('token');
        const username = this.getUrlParameter('username');



        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            return <Redirect to={{
                pathname: "/",
                state: { from: this.props.location }
            }} />;
        } else {
            return <Redirect to={{
                pathname: "/login",
            }} />;
        }
    }
}

export default OAuth2RedirectHandler;