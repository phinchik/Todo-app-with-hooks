import { getItemFromLocalStorage } from './helper'
import { DELETE_PROJECT_SUCCESS, GET_PROJECTS_SUCCESS, SAVE_PROJECT_SUCCESS, VIEW_PROJECT, DELETE_TODO_SUCCESS, UPDATE_VIEW_PROJECT } from './types'
import { saveToLocalStorage } from './helper'

export const getProjectList = () => {
    return dispatch => {
        const projects = Object.values(getItemFromLocalStorage('projects')) // this should have been an array (sorting purposes)!!! 
        dispatch({ type: GET_PROJECTS_SUCCESS, payload: projects })
    }
}

export const saveProject = (project) => {
    return dispatch => {
        const allProjects = getItemFromLocalStorage('projects')
        const updatedProjects = { ...allProjects, [project.id]: project }
        saveToLocalStorage([{ key: 'projects', value: updatedProjects }])
        dispatch({ type: SAVE_PROJECT_SUCCESS, payload: { project, list: Object.values(updatedProjects) } })

    }
}

export const viewProject = (project) => ({ type: VIEW_PROJECT, payload: project })

export const deleteTodo = (todoId, projectId) => {
    const projects = getItemFromLocalStorage('projects')
    const projectToUpdate = projects[projectId]

    const updatedProject = {
        ...projectToUpdate,
        todos: projectToUpdate.todos.filter(todo => todo.id !== todoId)
    }

    saveToLocalStorage([{ key: 'projects', value: { ...projects, [updatedProject.id]: updatedProject } }])

    return dispatch => {
        dispatch({ type: DELETE_TODO_SUCCESS, payload: updatedProject })
    }
}

export const updateViewProject = (project) => {
    const projects = getItemFromLocalStorage('projects')
    const updatedProjects = { ...projects, [project.id]: project }

    saveToLocalStorage([{ key: 'projects', value: updatedProjects }])
    return dispatch => {
        dispatch({ type: UPDATE_VIEW_PROJECT, payload: project, updatedList: Object.values(updatedProjects) })
    }
}

export const deleteProject = id => {
    const projects = getItemFromLocalStorage('projects')
    delete projects[id]

    saveToLocalStorage([{ key: 'projects', value: projects }])

    return dispatch => {
        dispatch({ type: DELETE_PROJECT_SUCCESS, payload: id })
    }
}