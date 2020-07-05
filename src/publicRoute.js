
import React from 'react'
import { Route } from 'react-router-dom'

const PublicRouteCurry = (loggedIn, history) => {
    return ({ component: Component, ...rest }) => {
        return (
            <Route
                {...rest}
                render={props => {
                    if (loggedIn) {
                        history.push('/projects')
                    } else {
                        return <Component {...rest} {...props} />
                    }
                }} />
        )
    }
}

export default PublicRouteCurry