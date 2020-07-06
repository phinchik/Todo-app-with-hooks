import React from 'react'

const TodoForm = ({ setTodoDetail, title, description, selectState, addTodo }) => {
    return (
        <>
            Title <input id='title' value={title} onChange={e => setTodoDetail(e)} /><br />
                    Description <input id='description' value={description} onChange={e => setTodoDetail(e)} /><br />
                    State <select id='selectState' value={selectState} onChange={e => setTodoDetail(e)} defaultValue='todo'>
                <option value='todo'>TODO</option>
                <option value='progress'>In Progress</option>
                <option value='done'>Done</option>
            </select>
            <br />
            <button onClick={addTodo}>Save</button>
            <br />
        </>
    )
}

export default TodoForm