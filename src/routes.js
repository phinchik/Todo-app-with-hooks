import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import history from './history'
import Login from './components/Login'
import Signup from './components/Signup'
import Projects from './components/Projects'
import ProjectDetails from './components/ProjectDetails'
import { connect } from 'react-redux'
// import PublicRouteCurry from './publicRoute'
// import PrivateRouteCurry from './privateRoute'
import { setLoggedInUser } from './redux/actions/auth'


const AppRoutes = ({ setLoggedInUser }) => {

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('userLoggedIn'))
        if (loggedInUser) {
            setLoggedInUser(loggedInUser)
        }
    }, [])

    return (
        <div style={{ padding: '100px' }}>
            <BrowserRouter history={history}>
                <Switch>
                    <Route path='/projects' exact={true} component={Projects} />
                    <Route path='/projects/:id' exact={true} component={ProjectDetails} />
                    <Route path='/login' exact={true} component={Login} />
                    <Route path='/signup' exact={true} component={Signup} />
                    <Route path='/' exact={true} component={Login} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

// const mapStateToProps = state => {
//     return {
//         loggedInUser: state.auth.loggedInUser,
//     }
// }

const mapDispatchToProps = {
    setLoggedInUser,
}

export default connect(null, mapDispatchToProps)(AppRoutes)