import React from 'react'

const Project = ({ name, todos }) => {
    return (
        <div style={{ border: '1px solid gray' }}>
            <p>{name}</p>
            <p>{`Number of todos: ${todos.length}`}</p>
        </div>
    )
}

export default Project