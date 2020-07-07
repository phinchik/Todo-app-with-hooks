import React, { useState, useEffect } from 'react'
import TodoList from '../TodoList'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { viewProject, updateViewProject, deleteTodo, saveProject } from '../../redux/actions/projects'
import './index.scss'


const ProjectDetails = ({ history, viewingProject, loggedInUser, viewProject, deleteTodo, updateView, saveProject }) => {
    const name = viewingProject?.name
    const todoList = viewingProject?.todos
    const projectId = viewingProject?.id
    const description = viewingProject?.decsription

    const updateViewProject = (updatedTodos) => {
        const project = { ...viewingProject, todos: updatedTodos }
        updateView(project)
    }

    useEffect(() => {
        if (!viewingProject) {
            /* refactor this */
            const id = history.location.pathname.split('/')[2]
            const allProjects = JSON.parse(localStorage.getItem('projects'))
            const project = allProjects[id]
            viewProject(project)
        }
    }, [])

    return (
        <>
            <Button onClick={() => history.push('/projects')}>Back</Button>
            <h1 className='projectName'>{name}</h1>
            <p className='projectDescription'>{description}</p>
            <TodoList
                updateViewProject={updateViewProject}
                todos={todoList}
                loggedInUser={loggedInUser}
                projectId={projectId}
                deleteTodo={deleteTodo}
                projectName={name}
                saveProject={saveProject}
            />
        </>
    )
}

const mapStateToProps = state => ({
    viewingProject: state.projects.viewingProject,
    loggedInUser: state.auth.loggedInUser
})

const mapDispatchToProps = {
    viewProject,
    deleteTodo,
    saveProject,
    updateView: updateViewProject
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)