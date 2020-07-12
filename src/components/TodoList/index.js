import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import MultiSelect from "react-multi-select-component"
import './index.scss'
import EditTodoModal from '../EditTodoModal'
import Board from '../Board'
import Form from 'react-bootstrap/Form'

const TodoList = ({ todos = [], loggedInUser, projectId, deleteTodo, projectName, saveProject, projectDescription }) => {
    const [selected, setSelected] = useState([]) /* filter */
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState('title')

    const todoInitialState = {
        description: '',
        title: '',
        selectState: '',
        date: null
    }

    const [todoDetails, setTodoDetails] = useState(todoInitialState)

    const setTodoDetail = (e, id) => {

        const key = e.target.id
        const value = id === 'date' ? e : e.target.value

        setTodoDetails({
            ...todoDetails,
            [key]: value
        })
    }

    const addTodo = (details) => {
        const { description, title, selectState, date } = details

        const newTodo = {
            description,
            title,
            selectState,
            id: uuidv4(),
            userId: loggedInUser.userId,
            project: projectId,
            date
        }

        const updatedTodos = [
            ...todos,
            newTodo
        ]

        onHandleSaveProject(updatedTodos)

        setTodoDetails({
            description: '',
            title: '',
            selectState: 'todo'
        })
    }

    /* Supposed to be used for filtering purposes */
    const options = [
        { label: 'TODO', value: "todo" },
        { label: 'In Progress', value: 'progress' },
        { label: 'Done', value: 'done' },
    ]

    const onHandleSaveProject = (updatedTodos) => {
        const updatedProject = {
            name: projectName,
            id: projectId,
            userId: loggedInUser.userId,
            todos: updatedTodos,
            date: todoDetails.date,
            decsription: projectDescription
        }
        saveProject(updatedProject)
    }

    const updateTodo = (todoDetails) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === todoDetails.id) {
                return { ...todoDetails, state: todoDetails.selectState, label: todoDetails.label }
            }
            return todo
        })


        onHandleSaveProject(updatedTodos)
        setEdittingForm(null)
    }

    const [edittingForm, setEdittingForm] = useState(null)
    const editForm = (data, projectId) => {
        setEdittingForm({ ...data, projectId })
    }


    const getResultsFromQuery = (projects) => {
        if (searchQuery) {
            return projects.filter(project => project[filter].includes(searchQuery))
        }
        return projects
    }

    const projectsToDisplay = getResultsFromQuery(todos)




    return (
        <div>
            <Form.Control className="formInput" placeholder='Search for project...' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <Form.Label className="formLabel" >Filter by:</Form.Label>

            <Form.Control className="dropDown" as="select" size="sm" custom onChange={e => setFilter(e.target.value)} >
                <option value='title'>Title</option>
                <option value='description'>Description</option>
            </Form.Control>
            <EditTodoModal
                updateTodo={updateTodo}
                addTodo={addTodo}
                setTodoDetail={setTodoDetail}
                {...todoDetails}
                edittingForm={edittingForm}
                setEdittingForm={setEdittingForm} />
            <Board
                projectId={projectId}
                onHandleSaveProject={onHandleSaveProject}
                todos={projectsToDisplay}
                selected={selected}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
                addTodo={addTodo}
                setTodoDetail={setTodoDetail}
                todoDetails={todoDetails}
                editForm={editForm} />
        </div >
    )
}

export default TodoList