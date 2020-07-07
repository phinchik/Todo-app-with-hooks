import React, { useState, useEffect } from 'react'
import Todo from '../Todo'
import TodoForm from '../TodoForm'
import { v4 as uuidv4 } from 'uuid'
import MultiSelect from "react-multi-select-component"
import Board from 'react-trello'
import './index.scss'
import moment from "moment";
import Card from 'react-bootstrap/Card'
import EditTodoModal from '../EditTodoModal'

const TodoList = ({ todos = [], loggedInUser, projectId, deleteTodo, projectName, saveProject }) => {
    const [selected, setSelected] = useState([]);
    const [sortBy, setSortBy] = useState('title')
    const [addingTodo, setAddingTodo] = useState(false)

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

    const applyFilters = (todos) => {
        const filters = selected.map(filter => filter.value) // [todo, progress, done]

        return todos.filter((todo) => filters.includes(todo.state))
    }

    const applySort = (todos) => {
        if (sortBy) {
            return todos && todos.sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
        }

        return todos
    }

    const options = [
        { label: 'TODO', value: "todo" },
        { label: 'In Progress', value: 'progress' },
        { label: 'Done', value: 'done' },
    ]

    const allTodos = selected.length ? applyFilters(todos) : todos
    const todoList = applySort(allTodos)

    const onCardDelete = (cardId, laneId) => {
        deleteTodo(cardId, projectId)
    }

    const onCardMoveAcrossLanes = (fromLaneId, toLaneId, cardId) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === cardId) {
                return { ...todo, state: toLaneId }
            }
            return todo
        })
        onHandleSaveProject(updatedTodos)
    }

    const onHandleSaveProject = (updatedTodos) => {
        const updatedProject = {
            name: projectName,
            id: projectId,
            userId: loggedInUser.userId,
            todos: updatedTodos,
            date: todoDetails.date
        }

        saveProject(updatedProject)
    }

    const getCards = (id) => {
        const filteredList = todoList.filter((todo) => {
            return todo.selectState === id
        })

        return filteredList
    }

    const data = {
        lanes: [
            {
                id: 'todo',
                date: 'TEST',
                title: 'TODO',
                cards: getCards("todo")
            },
            {
                id: 'progress',
                title: 'In Progress',
                cards: getCards("progress")
            },
            {
                id: 'done',
                title: 'Done',
                cards: getCards("done")
            }
        ]
    }

    const updateTodo = () => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === todoDetails.id) {
                return { ...todoDetails, state: todoDetails.selectState, label: todoDetails.label }
            }
            return todo
        })


        onHandleSaveProject(updatedTodos)
        setAddingTodo(!addingTodo)
    }

    const [edittingForm, setEdittingForm] = useState(null)
    const editForm = (data) => {
        setEdittingForm(data)
    }

    const components = {
        NewCardForm: (data) => {
            return <TodoForm selectState={data.laneId} updateTodo={updateTodo} addTodo={addTodo} setTodoDetail={setTodoDetail} {...todoDetails} data={data} />
        },
        NewLaneSection: () => <p>NewLane</p>,
        Card: (data) => {
            const cardId = data.id
            const laneId = data.laneId
            return (
                <div style={{ background: 'white', margin: '0.5rem 0' }}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Title: {data && data.title}</Card.Title>
                            <Card.Text>
                                Description: {data.description}
                            </Card.Text>
                            <footer>
                                Due Date: {data && moment(data.date).format("YYYY/MM/DD")}
                            </footer>
                            <a href='#' onClick={() => editForm(data)}>edit</a><br />
                            <a href='#' onClick={() => data.onDelete(cardId, laneId)}>delete</a>
                        </Card.Body>

                    </Card>
                </div>
            )
        }
    }

    return (
        <div>
            <EditTodoModal
                updateTodo={updateTodo}
                addTodo={addTodo}
                setTodoDetail={setTodoDetail}
                {...todoDetails}
                edittingForm={edittingForm}
                setEdittingForm={setEdittingForm} />

            <Board
                draggable
                data={data}
                onCardDelete={onCardDelete}
                onCardMoveAcrossLanes={onCardMoveAcrossLanes}
                editable
                className='board'
                components={components}
            />
        </div >
    )
}

export default TodoList