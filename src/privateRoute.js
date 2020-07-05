import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRouteCurry = (isLoggedIn) => {
    return ({ component: Component, ...rest }) => {
        console.log('HERE @@@@@@@')
        return (
            <Route
                {...rest}
                render={props => {
                    if (!isLoggedIn) {
                        return <Redirect to="/login" />
                    } else {
                        console.log('PrivateRouteCurry display Component')
                        return <Component {...rest} {...props} />
                    }
                }} />
        )
    }
}

export default PrivateRouteCurry