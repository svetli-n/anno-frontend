import React from "react";
import {AppContext} from "../../constants/context";


class SignOutButton extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }
    signOut() {
        const [, setUser] = this.context;
        const access_url = "http://localhost:5000/logout/access";
        fetch(access_url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .catch(error => {
                throw new Error(`Could not Sign out: ${error.toString()}`)
            });
        const refresh_url = "http://localhost:5000/logout/refresh";
        fetch(refresh_url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`
            }
        })
            .catch(error => {
                throw new Error(`Could not Sign out: ${error.toString()}`)
            });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        setUser('');
    }
    render() {
        return <button onClick={this.signOut}>Sign out</button>
    }

};

export default SignOutButton;