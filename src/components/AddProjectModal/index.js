import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'

const AddProjectModal = ({ show, handleClose, loggedInUser }) => {
    const [projectId, setProjectId] = useState('')
    const [name, setName] = useState('')
    const [todos, setTodos] = useState([])
    const [addingTodo, setAddingTodo] = useState(false)
    console.log('NEW TODOS >>>', todos)
    // todos
    const [todoDetails, setTodoDetails] = useState({
        description: '',
        title: '',
        selectState: 'todo'
    })
    // const [description, setDescription] = useState('')
    // const [title, setTitle] = useState('')
    // const [selectState, setSelectState] = useState('')

    useEffect(() => {
        setProjectId(uuidv4())
    }, [])

    const addProject = () => {
        console.log('loggedInUser >>>', loggedInUser)
        const project = {
            name,
            id: projectId,
            userId: loggedInUser.userId,
            todos
        }
    }

    const setTodoDetail = (e) => {
        setTodoDetails({
            ...todoDetails,
            [e.target.id]: e.target.value
        })
    }

    const addTodo = () => {
        const newTodo = {
            description,
            title,
            state: selectState,
            id: uuidv4(),
            userId: loggedInUser.userId,
            project: projectId
        }

        setTodos([
            ...todos,
            newTodo
        ])

        setTodoDetails({
            description: '',
            title: '',
            selectState: 'todo'
        })
        setAddingTodo(false)
    }
    const { title, description, selectState } = todoDetails
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Name <input value={name} onChange={e => setName(e.target.value)} />

                <h3>Todos</h3>
                {todos && todos.map((todo) => {
                    return (
                        <div style={{ marginBottom: '5px', border: '1px solid lightgray', display: 'flex', flexDirection: 'row' }}>
                            <p>Title: {todo.title} | </p>
                            <p>State: {todo.state} | </p>
                            <p>Description: {todo.description}</p>
                        </div>
                    )
                })}
                <button onClick={() => setAddingTodo(!addingTodo)}>+ Add a todo</button>

                {addingTodo && (
                    <>
                        Title <input id='title' value={title} onChange={e => setTodoDetail(e)} /><br />
                    Description <input id='description' value={description} onChange={e => setTodoDetail(e)} /><br />
                    State <select id='selectState' value={selectState} onChange={e => setTodoDetail(e)} defaultValue='todo'>
                            <option value='todo'>TODO</option>
                            <option value='progress'>In Progress</option>
                            <option value='done'>Done</option>
                        </select>
                        <br />
                        <button onClick={addTodo}>Add</button>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                <Button onClick={addProject} variant="primary">
                    Save Changes
                    </Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = state => ({
    loggedInUser: state.auth.loggedInUser
})
export default connect(mapStateToProps)(AddProjectModal)