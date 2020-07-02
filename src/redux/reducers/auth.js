import {
    SIGN_UP_SUCCESS
} from '../actions/types'

const initialState = {
    isLoggedIn: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP_SUCCESS: {
            return {
                ...state,
                isLoggedIn: true
            }
        }
        default:
            return state
    }
}