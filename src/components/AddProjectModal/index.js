import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'
import TodoList from '../TodoList'
import { saveProject, deleteTodo, updateViewProject } from '../../redux/actions/projects'
import Form from 'react-bootstrap/Form'

const AddProjectModal = ({ show, handleClose, loggedInUser, addProject, editedProjectData, deleteTodo, updateViewProject }) => {
    const [projectId, setProjectId] = useState('')
    const [projectName, setProjectName] = useState('')
    const [todos, setTodos] = useState([])
    // const [editProject, setEditProject] = useState(false)
    const [projectDescription, setProjectDescription] = useState('')


    useEffect(() => {
        if (editedProjectData) {
            const { id, name, todos, userId } = editedProjectData
            setProjectId(id)
            setProjectName(name)
            setTodos(todos)
            // setEditProject(true)
        }

    }, [editedProjectData])

    const saveProject = () => {
        const project = {
            name: projectName,
            id: uuidv4(),
            userId: loggedInUser.userId,
            decsription: projectDescription,
            todos
        }
        if (projectName === '') {
            console.log('Please fill out name')
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
        // setEditProject(false)
    }


    // const deleteInternalTodo = (todoId, projectId) => {
    //     const filteredTodos = todos && todos.filter((todo) => {
    //         return todo.id !== todoId
    //     })
    //     setTodos(filteredTodos)
    // }

    // const updateProject = () => {
    //     const project = {
    //         name: projectName,
    //         id: editedProjectData.id,
    //         userId: loggedInUser.userId,
    //         decsription: projectDescription,
    //         todos
    //     }
    //     updateViewProject(project)
    //     onhandleModalClose()
    // }

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

                {/* Name <input value={projectName} onChange={e => setProjectName(e.target.value)} />
                <div>Description: <input value={projectDescription} onChange={e => setProjectDescription(e.target.value)} /></div>

                <h3>Todos</h3> */}
                {/* <Form.Group>
                    <Form.Label>Create a list of todos for this project:</Form.Label>

                    <TodoList
                        todos={todos}
                        loggedInUser={loggedInUser}
                        setTodos={setTodos}
                        projectId={projectId}
                        deleteTodo={deleteTodo}
                        projectName={projectName}
                        updateViewProject={updateViewProject} />
                </Form.Group> */}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onhandleModalClose}>
                    Close
                    </Button>
                <Button onClick={saveProject} variant="primary"> {/* editProject */}
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