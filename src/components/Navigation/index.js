import React, {useContext} from "react";
import {Link} from "react-router-dom";

import * as ROUTES from '../../constants/routes';
import SignOutButton from "../SignOut";
import {AppContext} from "../../constants/context";

const AuthenticatedNavigation = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.HOME}>HOME</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
        </ul>
        <SignOutButton/>
    </div>
);

const NonAuthenticatedNavigation = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.SIGN_IN}>Sign in</Link>
            </li>
            <li>
                <Link to={ROUTES.SIGN_UP}>Sign up</Link>
            </li>
        </ul>
    </div>
);

const Navigation = () => {
    const [user, ] = useContext(AppContext);
    return <div>{user ? <AuthenticatedNavigation/> : <NonAuthenticatedNavigation/>}</div>
};

export default Navigation;