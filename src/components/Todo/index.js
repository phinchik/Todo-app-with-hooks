import React from 'react'

const Todo = ({ title, state, description, deleteTodo, id, projectId }) => {
    return (
        <div style={{ marginBottom: '5px', border: '1px solid lightgray', display: 'flex', flexDirection: 'row' }}>
            <p>Title: {title} | </p>
            <p>State: {state} | </p>
            <p>Description: {description}</p>
            <button onClick={() => deleteTodo(id, projectId)}>Delete</button>
        </div>
    )
}

export default Todo