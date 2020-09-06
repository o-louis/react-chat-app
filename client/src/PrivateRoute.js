import  React from  "react";
import { Route, Redirect } from  "react-router-dom";
import { AuthContext } from "./context/auth";

const  PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = React.useContext(AuthContext);
    return (
        <Route {...rest} render={props => (
            isLoggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: "/",
                    state: { referer: props.location }
                }}/>
            )
        )} />
    )
};
export  default  PrivateRoute;