import {
    SIGN_UP_SUCCESS,
    SET_LOGGED_IN_USER,
    LOG_OUT_SUCCESS
} from '../actions/types'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    loggedInUser: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP_SUCCESS: {
            return {
                ...state,
                loggedInUser: action.payload.newUser,
            }
        }
        case SET_LOGGED_IN_USER: {
            return {
                ...state,
                loggedInUser: action.payload,
            }
        }
        case LOG_OUT_SUCCESS: {
            return {
                ...state,
                loggedInUser: null
            }
        }
        default:
            return state
    }
}