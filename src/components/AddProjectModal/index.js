import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'
import { saveProject, deleteTodo, updateViewProject } from '../../redux/actions/projects'
import Form from 'react-bootstrap/Form'

const AddProjectModal = ({ show, handleClose, loggedInUser, addProject, editedProjectData, deleteTodo, updateViewProject }) => {
    const [projectId, setProjectId] = useState('')
    const [projectName, setProjectName] = useState('')
    const [todos, setTodos] = useState([])
    const [projectDescription, setProjectDescription] = useState('')


    useEffect(() => {
        if (editedProjectData) {
            const { id, name, todos } = editedProjectData
            setProjectId(id)
            setProjectName(name)
            setTodos(todos)
        }

    }, [editedProjectData])

    const saveProject = () => {
        const project = {
            name: projectName,
            id: uuidv4(),
            userId: loggedInUser.userId,
            description: projectDescription,
            todos
        }
        if (projectName === '') {
            alert('please fill out name')
        } else {
            addProject(project)
            onhandleModalClose()
        }
    }

    const onhandleModalClose = () => {
        handleClose()
        setProjectId('')
        setProjectName('')
        setTodos([])
        setProjectDescription('')
    }

    return (
        <Modal size="xl" show={show} onHide={onhandleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create a project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Enter name..." />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} placeholder="Enter description..." />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onhandleModalClose}>
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
    addProject: saveProject,
    deleteTodo,
    updateViewProject
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectModal)