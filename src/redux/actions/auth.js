import {
    SIGN_UP_SUCCESS,
    SET_LOGGED_IN_USER
} from './types'
import { saveToLocalStorage } from './helper'
import { v4 as uuidv4 } from 'uuid';

export const signUp = (allUsers, newUser) => {
    return (dispatch) => {
        const updatedUsers = { ...allUsers, [newUser.userId]: newUser }
        const projectId = uuidv4()
        const projects = {
            [projectId]: {
                userId: newUser.userId,
                name: "Default",
                todos: [],
                id: projectId
            }
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
