import React from "react";
import * as Routes from '../../constants/routes'
import {withRouter} from "react-router-dom";
import {SignUpLink} from "../SignUp";
import {AppContext} from "../../constants/context";

const INITIAL_STATE = {
    username: '',
    password: '',
    error: null,
};

const SignInPage = () => (
    <div>
        <h1>Sign in</h1>
        <SignInForm/>
        <SignUpLink />
    </div>
);


class SignInFormBase extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    };

    onSubmit = event => {
        const url = "http://localhost:5000/login";
        const {username, password} = this.state;
        const [, setUser] = this.context;
        let data = new FormData();
        data.append('username', username);
        data.append('password', password);

        fetch(url, {
            method: "POST",
            body: data,
        })
            .then(res => res.json())
            .then(data => {
                if (data.access_token === undefined) {
                    throw new Error(data.msg);
                }
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                localStorage.setItem('username', data.username);
                this.setState({...INITIAL_STATE});
                setUser(data.username);
                this.props.history.push(Routes.HOME);
            })
            .catch(error => this.setState({error}));
        event.preventDefault();
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value } );
    };

    render() {
        const {
            username,
            password,
            error,
        } = this.state;
        const isInvalid =
            password === '' ||
            username === '';
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Username"
                />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">Sign up</button>

                {error && <p>{error.toString()}</p>}
            </form>
        );
    };
}
const SignInForm = withRouter(SignInFormBase);

export default SignInPage;
export {SignInForm};

