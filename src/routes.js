import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import history from './history'
import Login from './components/Login'
import Signup from './components/Signup'
import Projects from './components/Projects'
import ProjectDetails from './components/ProjectDetails'
import { connect } from 'react-redux'
import { setLoggedInUser } from './redux/actions/auth'
import Container from 'react-bootstrap/Container'
import NavBar from './components/NavBar'
import privateRoute from './privateRoute'
import publicRoute from './publicRoute'
import './index.scss'

const AppRoutes = ({ setLoggedInUser }) => {

    useEffect(() => {
        const user = localStorage.getItem('userLoggedIn')
        const loggedInUser = user && JSON.parse(user)
        if (loggedInUser) {
            setLoggedInUser(loggedInUser)
        }
    }, [])

    return (
        <BrowserRouter history={history}>
            <Switch>
                <div style={{ background: 'dodgerblue' }}>
                    <NavBar />
                    <Container fluid={true} className='container'>
                        <Route path='/projects' exact={true} component={privateRoute(Projects)} />
                        <Route path='/projects/:id' exact={true} component={privateRoute(ProjectDetails)} />
                        <Route path='/login' exact={true} component={publicRoute(Login)} />
                        <Route path='/signup' exact={true} component={publicRoute(Signup)} />
                        <Redirect to='/projects' />
                    </Container>
                </div>
            </Switch>
        </BrowserRouter>
    )
}

const mapDispatchToProps = {
    setLoggedInUser,
}

export default connect(null, mapDispatchToProps)(AppRoutes)