import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

const Login = ({ history }) => {
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
                localStorage.setItem('userLoggedIn', username)
                history.push('/projects')
            } else {
                console.log("password is wrong")
            }
        } else {
            console.log("email does not exist")
        }
    }



    const validateInput = username !== '' && password !== ''
    return (
        <div>
            <Container style={{ margin: '0 auto' }}>
                <Row className="justify-content-md-center">
                    <Col xs={12} sm={12} md={8} lg={6} >
                        <Card border="primary" style={{
                            width: '100%', margin: '10rem auto', padding: '20px'
                        }}>
                            <Card.Header>Login</Card.Header>
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

export default Login