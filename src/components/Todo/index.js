import React from 'react'

const Todo = ({ title, state, description, deleteTodo, id, project }) => {
    return (
        <div style={{ marginBottom: '5px', border: '1px solid lightgray', display: 'flex', flexDirection: 'row' }}>
            <p>Title: {title} | </p>
            <p>State: {state} | </p>
            <p>Description: {description}</p>
            <button onClick={() => deleteTodo(id, project)}>Delete</button>
        </div>
    )
}

export default Todo