import React, { useState, useEffect } from 'react'
import Todo from '../Todo'
import TodoForm from '../TodoForm'
import { v4 as uuidv4 } from 'uuid'
import MultiSelect from "react-multi-select-component"
import Board from 'react-trello'
import { connect } from 'react-redux'
import { updateViewProject } from '../../redux/actions/projects'
import './index.scss'
import moment from "moment";
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'

// e.toISOString().slice(0, 10)
const TodoList = ({ todos = [], setTodos, loggedInUser, projectId, deleteTodo, updateViewProject, projectName, projectDetailPage }) => {
    const [selected, setSelected] = useState([]);
    const [sortBy, setSortBy] = useState('title')
    const [addingTodo, setAddingTodo] = useState(false)
    const [addingATodo, setAddingATodo] = useState(false)

    const todoInitialState = {
        description: '',
        title: '',
        selectState: 'todo',
        date: null
    }

    const [todoDetails, setTodoDetails] = useState(todoInitialState)

    useEffect(() => {

    }, [todos])
    const setTodoDetail = (e, id) => {

        const key = e.target.id
        const value = id === 'date' ? e : e.target.value

        setTodoDetails({
            ...todoDetails,
            [key]: value
        })
    }

    const addTodo = (todoDetails) => {
        const { description, title, selectState, date } = todoDetails

        const newTodo = {
            description,
            title,
            state: selectState,
            id: uuidv4(),
            userId: loggedInUser.userId,
            project: projectId,
            date
        }

        console.log('newTodo -->', newTodo)

        const updatedTodos = [
            ...todos,
            newTodo
        ]

        onHandleSaveProject(updatedTodos)

        setTodos(updatedTodos)

        // if (updateViewProject) {
        //     console.log("hereee")
        //     updateViewProject(updatedTodos)
        // }

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
        setTodos(updatedTodos)
        if (projectDetailPage) {
            onHandleSaveProject(updatedTodos)
        }
    }

    const handleCardAdd = (card, laneId) => {
        setTodoDetails({
            ...todoDetails,
            title: card.title,
            description: card.description,
            selectState: laneId
        })

        const newTodo = {
            description: card.description,
            title: card.title,
            state: laneId,
            id: card.id,
            userId: loggedInUser.userId,
            project: projectId
        }
        const updatedTodos = [
            ...todos,
            newTodo
        ]

        setTodos(updatedTodos)

        setTodoDetails({
            description: '',
            title: '',
            selectState: 'todo'
        })
        if (projectDetailPage) {
            onHandleSaveProject(updatedTodos)
        }


    }

    const onHandleSaveProject = (updatedTodos) => {
        const updatedProject = {
            name: projectName,
            id: projectId,
            userId: loggedInUser.userId,
            todos: updatedTodos || todos,
            date: todoDetails.date
        }
        updateViewProject(updatedProject)
    }

    const getCards = (id) => {
        const filteredList = todoList.filter((todo) => {
            return todo.state === id
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

    const onHandleTodoCard = (cardId, metadata, laneId) => {
        const filteredList = todoList.filter((todo) => {
            return todo.id === cardId
        })
        const todoDetails = filteredList[0]
        setTodoDetails({
            ...todoDetails,
            id: cardId
        })
        setAddingTodo(!addingTodo)
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

    const components = {
        NewCardForm: () => <TodoForm addingATodo={addingATodo} updateTodo={updateTodo} addTodo={addTodo} setTodoDetail={setTodoDetail} {...todoDetails} />,
        NewLaneSection: () => <p>NewLane</p>,
        Card: (x) => {
            return (
                <div style={{ background: 'white', margin: '0.5rem 0' }}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Title: {x && x.title}</Card.Title>
                            <Card.Text>
                                Description: {x.description}
                            </Card.Text>
                            <footer>
                                Due Date: {x && moment(x.date).format("YYYY/MM/DD")}
                            </footer>
                        </Card.Body>

                    </Card>
                </div>
            )
        }
    }

    return (
        <div>

            {todoList && todoList.length > 0 && <div>
                <p>Sort by:</p>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value='title'>Title</option>
                    <option value='description'>Description</option>
                </select>
                <p>Filter state:</p>
                {options && <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    disableSearch={true}
                />}
            </div>}

            <Board
                draggable
                data={data}
                onCardDelete={onCardDelete}
                onCardMoveAcrossLanes={onCardMoveAcrossLanes}
                onCardAdd={() => {
                    handleCardAdd()
                    setAddingATodo(true)
                }}
                onCardClick={(cardId, metadata, laneId) => onHandleTodoCard(cardId, metadata, laneId)}
                editable
                style={{ height: '600px', background: 'white' }}
                // style={{ width: '80%', margin: '5rem auto', height: '60vh', overflow: 'auto' }}
                components={components}
            />
        </div>
    )
}

const mapDispatchToProps = {
    updateViewProject
}

export default connect(null, mapDispatchToProps)(TodoList)