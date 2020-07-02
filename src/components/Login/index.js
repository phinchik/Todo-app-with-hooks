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


    console.log('RENDER LOGIN @@@@@')
    const goToSignup = () => {
        history.push('/signup')
    }

    const validateInput = username !== '' && password !== ''
    return (
        <div>
            {/* <h1>Login</h1>
            <input placeholder="Username..." />
            <input placeholder="Password..." />
            <button>Login</button>

            <p onClick={goToSignup}>Don't have an account?</p> */}
            <Container style={{ margin: '0 auto' }}>

                <Row className="justify-content-md-center">
                    <Col xs={12} sm={12} md={8} lg={6} >
                        <Card border="primary" style={{
                            width: '100%', margin: '10rem auto', padding: '20px'
                        }}>
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
                                <Button variant={validateInput ? "primary" : "secondary"} type="submit">
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