import React from "react";
import * as Routes from '../../constants/routes'
import {Link, withRouter} from "react-router-dom";
import {AppContext} from "../../constants/context";

const INITIAL_STATE = {
    username: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const SignUpPage = () => (
    <div>
        <h1>Sign up</h1>
        <SignUpForm />
    </div>
);

const SignUpLink = () => (
    <p>
        Dont have an account <Link to={Routes.SIGN_UP}>Sign up</Link>
    </p>
)

class SignUpFormBase extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    };

    onSubmit = event => {
        const url = "http://localhost:5000/registration";
        const {username, passwordOne} = this.state;
        const [, setUser] = this.context;
        let data = new FormData();
        data.append('username', username);
        data.append('password', passwordOne);

        fetch(url, {
            method: "POST",
            body: data,
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                localStorage.setItem('username', data.username);
                this.setState({...INITIAL_STATE});
                setUser(data.username);
                this.props.history.push(Routes.HOME);
            })
            .catch( error => this.setState({error}));
        event.preventDefault();
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value } );
    };

    render() {
        const {
            username,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
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
                   name="passwordOne"
                   value={passwordOne}
                   onChange={this.onChange}
                   type="password"
                   placeholder="Password"
               />
               <input
                   name="passwordTwo"
                   value={passwordTwo}
                   onChange={this.onChange}
                   type="password"
                   placeholder="Confirm password"
               />
               <button disabled={isInvalid} type="submit">Sign up</button>

               {error && <p>error.msg</p>}
           </form>
       );
    };
}

const SignUpForm = withRouter(SignUpFormBase);

export default SignUpPage;
export {SignUpForm, SignUpLink};

