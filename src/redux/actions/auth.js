import {
    SIGN_UP_SUCCESS,
    SET_LOGGED_IN_USER,
    LOG_OUT_SUCCESS
} from './types'
import { saveToLocalStorage } from './helper'
import { v4 as uuidv4 } from 'uuid';

export const signUp = (allUsers, newUser) => {
    return (dispatch) => {
        const updatedUsers = { ...allUsers, [newUser.username]: newUser }
        const projectId = uuidv4()
        const projects = {
            userId: newUser.userId,
            name: "Default",
            todos: [],
            id: projectId,
            description: ''
        }

        saveToLocalStorage([
            { key: 'users', value: updatedUsers },
            { key: 'projects', value: projects },
            { key: 'userLoggedIn', value: newUser }
        ])

        dispatch({
            type: SIGN_UP_SUCCESS,
            payload: { newUser, projects }
        })
    }
}


export const setLoggedInUser = (userData) => {
    return (dispatch) => {
        dispatch({
            type: SET_LOGGED_IN_USER,
            payload: userData
        })
    }
}

export const logOut = () => {
    localStorage.setItem('userLoggedIn', null)

    return dispatch => {
        dispatch({
            type: LOG_OUT_SUCCESS
        })
    }
}