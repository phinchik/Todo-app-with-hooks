import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { setLoggedInUser } from '../../redux/actions/auth'
import { connect } from 'react-redux'
import './index.scss'

const Login = ({ history, setLoggedInUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const goToSignup = () => {
        history.push('/signup')
    }

    const handleLogin = () => {
        const allUsers = JSON.parse(localStorage.getItem('users')) || {}
        if (allUsers && allUsers[username]) {
            const userDetails = allUsers[username]
            if (userDetails.password === password) {
                localStorage.setItem('userLoggedIn', JSON.stringify(userDetails))
                setLoggedInUser(userDetails)
            } else {
                alert('wrong password')
            }
        } else {
            alert('email does not exist')
        }
    }

    const validateInput = username !== '' && password !== ''
    return (
        <div>
            <Container className="loginContainer" >
                <Row className="justify-content-md-center">
                    <Col xs={12} sm={12} md={8} lg={6} >
                        <Card border="primary" className="loginCard" >
                            <h1>Login</h1>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control onChange={(e) => setUsername(e.target.value)} type="email" placeholder="Enter email" />

                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Text onClick={goToSignup} className="text-muted">
                                        Don't have an account?
                            </Form.Text>
                                </Form.Group>
                                <Button onClick={handleLogin} variant={validateInput ? "primary" : "secondary"} >
                                    Submit
                            </Button>
                            </Form>
                        </Card>
                    </Col>

                </Row>

            </Container>


        </div>
    )
}
const mapDispatchToProps = {
    setLoggedInUser,
}

export default connect(null, mapDispatchToProps)(Login)