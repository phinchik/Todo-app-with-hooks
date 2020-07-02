
import React from 'react'
import { Route } from 'react-router-dom'

const PublicRouteCurry = (loggedIn, history) => {
    return ({ component: Component, ...rest }) => {
        console.log('inside public route curry')
        return (
            <Route
                {...rest}
                render={props => {
                    if (loggedIn) {
                        console.log('USER IS LOGGED IN @@@@@@@@@@@@@@@@')
                        history.push('/projects')
                    } else {
                        console.log('RENDERING LOGIN')
                        return <Component {...rest} {...props} />
                    }
                }} />
        )
    }
}

export default PublicRouteCurry