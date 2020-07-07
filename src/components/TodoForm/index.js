import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const TodoForm = ({ setTodoDetail, selectState, updateTodo, datepicker, addTodo, addingATodo }) => {
    const todoInitialState = {
        description: '',
        title: '',
        selectState,
        date: new Date()
    }

    const [todoDetails, setTodoDetails] = useState(todoInitialState)
    const { title, description } = todoDetails


    return (
        <div style={{ padding: '8px', borderRadius: '4px', background: 'white' }}>
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control id='title' value={title} onChange={(e) => setTodoDetails({ ...todoDetails, title: e.target.value })} placeholder="Enter title" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control id='description' value={description} onChange={(e) => setTodoDetails({ ...todoDetails, description: e.target.value })} placeholder="Enter description" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Due Date</Form.Label>
                    <br />
                    <DatePicker
                        id='date'
                        selected={todoDetails.date}
                        onSelect={(e) => setTodoDetails({ ...todoDetails, date: e })} />
                </Form.Group>

                <Button onClick={() => addTodo(todoDetails)} variant='secondary'>Add</Button>
            </Form>


        </div>

        // <>
        //     Title <input id='title' value={title} onChange={e => setTodoDetail(e)} /><br />
        //             Description <input id='description' value={description} onChange={e => setTodoDetail(e)} /><br />
        //           Due Date <DatePicker selected={startDate} onSelect={(e, x) => {
        //         setTodoDetail(e, 'datepicker')
        //     }
        //     } />
        //             State <select id='selectState' value={selectState} onChange={e => setTodoDetail(e)} >
        //         <option value='todo'>TODO</option>
        //         <option value='progress'>In Progress</option>
        //         <option value='done'>Done</option>
        //     </select>
        //     <br />
        //     <button onClick={addingATodo ? addTodo : updateTodo}>Update Todo</button>
        //     <br />
        // </>
    )
}

export default TodoForm