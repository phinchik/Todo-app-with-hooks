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
    const [edit, setEdit] = useState(null)

    const defaultEditState = {
        name: null,
        description: null,
    }

    const [editFields, setEditFields] = useState(defaultEditState)

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

    const editField = (fieldName) => {
        setEdit(fieldName)
    }

    const cancelEdit = () => {
        setEdit(null)
        setEditFields(defaultEditState)
    }

    const saveUpdatedProject = () => {
        const updatedProject = {
            name: editFields.name || name,
            id: projectId,
            userId: loggedInUser.userId,
            todos: todoList,
            decsription: editFields.description || description
        }

        saveProject(updatedProject)
        setEdit(null)
        setEditFields(defaultEditState)
    }

    const setEditValue = (e) => {
        const id = e.target.id
        const value = e.target.value

        setEditFields({
            ...editFields,
            [id]: value
        })
    }

    return (
        <>
            <Button onClick={() => history.push('/projects')}>Back</Button>
            {edit === 'name'
                ? (
                    <>
                        <input value={editFields?.name || name} id='name' onChange={setEditValue} style={{ width: '300px', fontSize: '2.5rem', marginTop: '40px', marginBottom: '10px', display: 'block' }} />
                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '30px' }}>
                            <Button style={{ marginRight: '10px' }} variant='success' onClick={saveUpdatedProject}> Save</Button>
                            <Button variant='secondary' onClick={cancelEdit}>Cancel</Button>
                        </div>
                    </>
                )
                : (
                    <>
                        <h1 className='projectName'>{name} <Button style={{ fontSize: '12px' }} onClick={() => editField('name')}>Edit</Button></h1>
                    </>
                )
            }

            {edit === 'description'
                ? (
                    <>
                        <textarea id='description' value={editFields?.description || description} onChange={setEditValue} style={{ width: '300px', height: '200px' }} />
                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '30px' }}>
                            <Button style={{ marginRight: '10px' }} variant='success' onClick={saveUpdatedProject}> Save</Button>
                            <Button variant='secondary' onClick={cancelEdit}>Cancel</Button>
                        </div>
                    </>
                )
                : (
                    <>
                        <p className='projectDescription'>{description} <Button style={{ fontSize: '12px' }} onClick={() => editField('description')}>Edit</Button></p>
                    </>
                )
            }
            <TodoList
                updateViewProject={updateViewProject}
                todos={todoList}
                loggedInUser={loggedInUser}
                projectId={projectId}
                projectDescription={description}
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