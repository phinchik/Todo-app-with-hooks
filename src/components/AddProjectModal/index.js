import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'
import TodoList from '../TodoList'
import { saveProject } from '../../redux/actions/projects'

const AddProjectModal = ({ show, handleClose, loggedInUser, addProject }) => {
    const [projectId, setProjectId] = useState('')
    const [projectName, setProjectName] = useState('')
    const [todos, setTodos] = useState([])

    useEffect(() => {
        setProjectId(uuidv4())
    }, [])

    const saveProject = () => {
        const project = {
            name: projectName,
            id: projectId,
            userId: loggedInUser.userId,
            todos
        }

        if (projectName === '') {
            console.log('Please fill out name')
        } else {
            addProject(project)
            handleClose()
            setProjectName('')
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Name <input value={projectName} onChange={e => setProjectName(e.target.value)} />

                <h3>Todos</h3>
                <TodoList todos={todos} loggedInUser={loggedInUser} setTodos={setTodos} projectId={projectId} />

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                <Button onClick={saveProject} variant="primary">
                    Save Changes
                    </Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = state => ({
    loggedInUser: state.auth.loggedInUser
})

const mapDispatchToProps = {
    addProject: saveProject
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectModal)