import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../../redux/actions/auth'

const Signup = ({ history, signUpUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const goToLogin = () => {
        history.push('/login')
    }

    const handleSignUp = () => {
        const allUsers = JSON.parse(localStorage.getItem('users')) || {}

        if (allUsers && allUsers[username]) {
            // email already taken
        } else {
            const updatedUsers = { ...allUsers, [username]: { username, password } }
            // update user database
            localStorage.setItem('users', JSON.stringify(updatedUsers))
            // set authenticated -> true
            localStorage.setItem('userLoggedIn', username)
            signUpUser()
        }
    }

    return (
        <div>
            <h1>Signup</h1>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username..." />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password..." />
            <button onClick={handleSignUp}>Sign up</button>

            <p onClick={() => goToLogin()}> Already have an account?</p>
        </div >
    )
}

const mapDispatchToProps = {
    signUpUser: signUp
}

export default connect(null, mapDispatchToProps)(Signup)