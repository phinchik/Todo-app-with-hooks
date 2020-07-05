import {
    SIGN_UP_SUCCESS,
    GET_PROJECTS_SUCCESS
} from '../actions/types'

const initialState = {
    list: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP_SUCCESS: {
            return {
                ...state,
                list: [action.payload.projects]
            }
        }
        case GET_PROJECTS_SUCCESS: {
            return {
                ...state,
                list: action.payload
            }
        }
        default:
            return state
    }
}