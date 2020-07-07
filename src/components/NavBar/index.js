import React from 'react'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logOut } from '../../redux/actions/auth'
import './index.scss'

const NavBar = ({ history, loggedInUser, logOut }) => {
    const goToProjects = () => {
        history.push('/projects')
    }

    const logUserOut = () => {
        logOut()
    }

    return (
        <div className='navBar'>
            <h2 onClick={goToProjects} className='navBar__logo'>Todo</h2>
            {loggedInUser && <Button onClick={logUserOut}>Log Out</Button>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.auth.loggedInUser
    }
}

const mapDispatchToProps = {
    logOut
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))