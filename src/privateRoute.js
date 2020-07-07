import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRouteCurry = (isLoggedIn) => {
    return ({ component: Component, ...rest }) => {
        return (
            <Route
                {...rest}
                render={props => {
                    if (!isLoggedIn) {
                        return <Redirect to="/login" />
                    } else {
                        return <Component {...rest} {...props} />
                    }
                }} />
        )
    }
}

export default PrivateRouteCurry