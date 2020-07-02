import React, { useEffect } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import history from './history'
import Login from './components/Login'
import Signup from './components/Signup'
import Projects from './components/Projects'
// import PrivateRouteCurry from './privateRoute'
import { connect } from 'react-redux'
import PublicRouteCurry from './publicRoute'
import PrivateRouteCurry from './privateRoute'


const AppRoutes = ({ isLoggedIn }) => {
    console.log('isLoggedIn -->', isLoggedIn)

    const PublicRoute = PublicRouteCurry(isLoggedIn, history)
    const PrivateRoute = PrivateRouteCurry(isLoggedIn, history)
    console.log('rerender')

    return (
        <div>
            <BrowserRouter history={history}>
                <Switch>
                    <PublicRoute path='/login' exact={true} component={Login} />
                    <PublicRoute path='/signup' exact={true} component={Signup} />
                    <PrivateRoute path='/projects' exact={true} component={Projects} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}

export default connect(mapStateToProps)(AppRoutes)