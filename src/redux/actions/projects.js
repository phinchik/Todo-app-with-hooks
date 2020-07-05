import { getItemFromLocalStorage } from './helper'
import { GET_PROJECTS_SUCCESS } from './types'

export const getProjectList = () => {
    return dispatch => {
        const projects = Object.values(getItemFromLocalStorage('projects'))
        dispatch({ type: GET_PROJECTS_SUCCESS, payload: projects })
    }
}

export const addProject = () => {

}