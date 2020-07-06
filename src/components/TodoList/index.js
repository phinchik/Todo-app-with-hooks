import React, { useState } from 'react'
import Todo from '../Todo'
import TodoForm from '../TodoForm'
import { v4 as uuidv4 } from 'uuid'
import MultiSelect from "react-multi-select-component"

const TodoList = ({ todos, setTodos, loggedInUser, projectId, deleteTodo, updateViewProject }) => {
    const [selected, setSelected] = useState([]);
    const [addingTodo, setAddingTodo] = useState(false)
    const [sortBy, setSortBy] = useState('title')

    const todoInitialState = {
        description: '',
        title: '',
        selectState: 'todo'
    }

    const [todoDetails, setTodoDetails] = useState(todoInitialState)

    const setTodoDetail = (e) => {
        setTodoDetails({
            ...todoDetails,
            [e.target.id]: e.target.value
        })
    }

    const addTodo = () => {
        const { description, title, selectState } = todoDetails
        const newTodo = {
            description,
            title,
            state: selectState,
            id: uuidv4(),
            userId: loggedInUser.userId,
            project: projectId
        }
        const updatedTodos = [
            ...todos,
            newTodo
        ]

        setTodos(updatedTodos)

        if (updateViewProject) {
            updateViewProject(updatedTodos)
        }

        setTodoDetails({
            description: '',
            title: '',
            selectState: 'todo'
        })
        setAddingTodo(false)
    }

    const applyFilters = (todos) => {
        const filters = selected.map(filter => filter.value) // [todo, progress, done]

        return todos.filter((todo) => filters.includes(todo.state))
    }

    const applySort = (todos) => {
        if (sortBy) {
            return todos.sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
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
    return (
        <div>
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
            {todoList && todoList.map((todo) => {
                return <Todo {...todo} deleteTodo={deleteTodo} />
            })}

            {addingTodo && <TodoForm addTodo={addTodo} setTodoDetail={setTodoDetail} {...todoDetails} />}
            <button onClick={() => setAddingTodo(!addingTodo)}>{addingTodo ? '- Close Todo' : '+ Add Todo'}</button>
        </div>
    )
}

export default TodoList