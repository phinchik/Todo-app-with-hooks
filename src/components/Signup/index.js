import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../../redux/actions/auth'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { v4 as uuidv4 } from 'uuid';
import { passwordValidator, validateMinimum, validateUpperCase, validateLowerCase, validateNumber, validateSpecialCharacter } from "../../helpers/passwordValidator"

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
            if (passwordValidator(password)) {
                const newUser = {
                    username, password, userId: uuidv4()
                }
                signUpUser(allUsers, newUser)
            } else {
                console.log("put some error msg")
            }

        }
    }

    const validateInput = username !== '' && passwordValidator(password)
    const minValue = validateMinimum(password)
    const hasUpperCase = validateUpperCase(password)
    const hasLowerCase = validateLowerCase(password)
    const hasNumber = validateNumber(password)
    const hasSpecialChar = validateSpecialCharacter(password)
    return (
        <div>
            <Container style={{ margin: '0 auto' }}>
                <Row className="justify-content-md-center">
                    <Col xs={12} sm={12} md={8} lg={6} >
                        <Card border="primary" style={{
                            width: '100%', margin: '10rem auto', padding: '20px'
                        }}>
                            <Card.Header>Sign up</Card.Header>
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
                                    <Form.Check readOnly checked={minValue} type="checkbox" label="Minimum 8 characters and maximum of 64" />
                                    <Form.Check readOnly checked={hasUpperCase} type="checkbox" label="Atleast 1 upper case letters (A-Z)" />
                                    <Form.Check readOnly checked={hasLowerCase} type="checkbox" label="Atleast 1 lower case letters (a-z)" />
                                    <Form.Check readOnly checked={hasNumber} type="checkbox" label="Atleast 1 number (0-9)" />
                                    <Form.Check readOnly checked={hasSpecialChar} type="checkbox" label="Atleast 1 non-alphanumeric symbol (e.g. '@Z$%!')" />
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Text onClick={() => goToLogin()} className="text-muted">
                                        Already have an account?
                            </Form.Text>
                                </Form.Group>
                                <Button disabled={!validateInput} onClick={() => handleSignUp()} variant={validateInput ? "primary" : "secondary"} >
                                    Sign up
                            </Button>
                            </Form>
                        </Card>
                    </Col>

                </Row>

            </Container>
        </div >
    )
}

const mapDispatchToProps = {
    signUpUser: signUp
}

export default connect(null, mapDispatchToProps)(Signup)