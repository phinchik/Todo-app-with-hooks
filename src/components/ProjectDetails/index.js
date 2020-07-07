import React, { useState, useEffect } from 'react'
import TodoList from '../TodoList'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { viewProject, updateViewProject, deleteTodo, saveProject } from '../../redux/actions/projects'
import './index.scss'


const ProjectDetails = ({ history, viewingProject, loggedInUser, viewProject, deleteTodo, updateView }) => {
    const name = viewingProject?.name
    const todoList = viewingProject?.todos
    const projectId = viewingProject?.id

    const [todos, setTodos] = useState([])

    const updateViewProject = (updatedTodos) => {
        const project = { ...viewingProject, todos: updatedTodos }
        updateView(project)
    }

    useEffect(() => {
        if (!viewingProject) { /* from redux store */
            const id = history.location.pathname.split('/')[2]
            const allProjects = JSON.parse(localStorage.getItem('projects'))
            const project = allProjects[id]
            viewProject(project)
            setTodos(project?.todos)
        } else {
            setTodos(todoList)
        }
    }, [])

    useEffect(() => {

    }, [todos])
    return (
        <div className="projectDetailRoot">
            <Button onClick={() => history.push('/projects')} variant="primary"> {`Back To All Projects`}</Button>{' '}
            <h1>{name}</h1>
            <TodoList
                updateViewProject={updateViewProject}
                todos={todoList || todos}
                loggedInUser={loggedInUser}
                projectId={projectId}
                setTodos={setTodos}
                deleteTodo={deleteTodo}
                projectName={name}
                projectDetailPage={true} />
        </div>
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