import { combineReducers } from 'redux'
import authReducer from './auth'
import projectReducer from './projects'

const rootReducer = combineReducers({
    auth: authReducer,
    projects: projectReducer
})

export default rootReducer