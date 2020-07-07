import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getItemFromLocalStorage } from '../../redux/actions/helper'
import './index.scss'

const TodoForm = ({ editTodo, addTodo, data, edit }) => {
    useEffect(() => {
        // refactor... all we are trying to do is get todo data to edit
        const projects = getItemFromLocalStorage('projects')
        const project = projects[edit?.projectId]
        const viewingTodo = project?.todos?.find((todo) => {
            return todo.id !== edit?.id
        })

        if (viewingTodo) {
            setTodoDetails({
                description: viewingTodo.description,
                title: viewingTodo.title,
                selectState: data?.laneId,
                date: new Date()
            })
        }
    }, [])

    const todoInitialState = {
        description: '',
        title: '',
        selectState: data?.laneId,
        date: new Date()
    }

    const [todoDetails, setTodoDetails] = useState(todoInitialState)

    return (
        <div className='todoFormContainer'>
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control id='title' value={todoDetails.title} onChange={(e) => setTodoDetails({ ...todoDetails, title: e.target.value })} placeholder="Enter title" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control id='description' value={todoDetails.description} onChange={(e) => setTodoDetails({ ...todoDetails, description: e.target.value })} placeholder="Enter description" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Due Date</Form.Label>
                    <br />
                    <DatePicker
                        id='date'
                        selected={todoDetails.date}
                        onSelect={(e) => setTodoDetails({ ...todoDetails, date: e })} />
                </Form.Group>

                <Button onClick={() => edit ? editTodo(todoDetails) : addTodo(todoDetails)} variant='secondary'>{edit ? 'Update' : 'Add'}</Button><br />
            </Form>
        </div>
    )
}

export default TodoForm