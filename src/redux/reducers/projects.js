import {
    SIGN_UP_SUCCESS,
    GET_PROJECTS_SUCCESS,
    SAVE_PROJECT_SUCCESS,
    VIEW_PROJECT,
    DELETE_TODO_SUCCESS,
    UPDATE_VIEW_PROJECT,
    DELETE_PROJECT_SUCCESS,
    UPDATE_PROJECT_ORDER_SUCCESS
} from '../actions/types'

const initialState = {
    list: [],
    viewingProject: null
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
        case SAVE_PROJECT_SUCCESS: {
            return {
                ...state,
                list: action.payload.list,
                viewingProject: action.payload.project
            }
        }
        case VIEW_PROJECT: {
            return {
                ...state,
                viewingProject: action.payload
            }
        }
        case UPDATE_VIEW_PROJECT:
            return {
                ...state,
                viewingProject: action.payload,
                list: action.updatedList
            }
        case DELETE_TODO_SUCCESS: {
            return {
                ...state,
                viewingProject: action.payload
            }
        }
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                list: state.list.filter(project => project.id !== action.payload)
            }
        case UPDATE_PROJECT_ORDER_SUCCESS:
            return {
                ...state,
                list: action.payload
            }
        default:
            return state
    }
}