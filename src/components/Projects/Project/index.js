import React from 'react'
import { withRouter } from 'react-router-dom'
import { viewProject, deleteProject } from '../../../redux/actions/projects'
import { connect } from 'react-redux'

const Project = ({ name, todos, history, id, viewProject, deleteProject, creator }) => {
    const goToProject = () => {
        const project = {
            name,
            todos,
            id
        }
        viewProject(project)
        history.push(`/projects/${id}`)
    }

    return (
        <div style={{ cursor: 'pointer', marginBottom: '5px', border: '1px solid lightgray' }}>
            <p>{name}</p>
            <p>{`Number of todos: ${todos.length}`}</p>
            <button onClick={goToProject}>View</button>
            <button onClick={() => deleteProject(id)}>Delete</button>
            <p>Created by: {creator}</p>
        </div>
    )
}

const mapDispatchToProps = {
    viewProject,
    deleteProject
}

export default withRouter(connect(null, mapDispatchToProps)(Project))