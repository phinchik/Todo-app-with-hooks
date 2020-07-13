import { getItemFromLocalStorage } from './helper'
import { DELETE_PROJECT_SUCCESS, UPDATE_PROJECT_ORDER_SUCCESS, GET_PROJECTS_SUCCESS, SAVE_PROJECT_SUCCESS, VIEW_PROJECT, DELETE_TODO_SUCCESS, UPDATE_VIEW_PROJECT } from './types'
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
        const projectFound = allProjects.find(proj => project.id === proj.id)

        let updatedProjects

        if (projectFound) {
            const updated = allProjects.map(proj => {
                if (project.id === proj.id) { // update info
                    return {
                        ...project
                    }
                }
                return proj
            })

            updatedProjects = updated
        } else {
            updatedProjects = [
                ...allProjects,
                project
            ]
        }


        saveToLocalStorage([{ key: 'projects', value: updatedProjects }])
        dispatch({ type: SAVE_PROJECT_SUCCESS, payload: { project, list: updatedProjects } })

    }
}

export const updateProjectOrder = (projects) => {
    saveToLocalStorage([{ key: 'projects', value: projects }])
    return dispatch => {
        dispatch({ type: UPDATE_PROJECT_ORDER_SUCCESS, payload: projects })
    }
}

export const viewProject = (project) => ({ type: VIEW_PROJECT, payload: project })

export const deleteTodo = (todoId, projectId) => {
    const projects = getItemFromLocalStorage('projects')

    const updatedProjects = projects.map(proj => {
        if (proj.id === projectId) {
            return {
                ...proj,
                todos: proj.todos.filter(todo => todo.id !== todoId)
            }
        }
        return proj
    })

    const updatedView = updatedProjects.find(proj => proj.id === projectId)

    saveToLocalStorage([{ key: 'projects', value: updatedProjects }])

    return dispatch => {
        dispatch({ type: DELETE_TODO_SUCCESS, payload: updatedView })
    }
}

export const updateViewProject = (project) => {
    const projects = getItemFromLocalStorage('projects')
    const updatedProjects = [...projects, project]

    saveToLocalStorage([{ key: 'projects', value: updatedProjects }])
    return dispatch => {
        dispatch({ type: UPDATE_VIEW_PROJECT, payload: project, updatedList: updatedProjects })
    }
}

export const deleteProject = id => {
    const projects = getItemFromLocalStorage('projects')
    const filteredProjects = projects.filter((project) => {
        return project.id !== id
    })


    saveToLocalStorage([{ key: 'projects', value: filteredProjects }])

    return dispatch => {
        dispatch({ type: DELETE_PROJECT_SUCCESS, payload: id })
    }
}