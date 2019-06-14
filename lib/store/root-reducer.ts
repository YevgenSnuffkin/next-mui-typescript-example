import { combineReducers } from 'redux'
import { IState } from './store'
import { WindowActions, ACTIONS } from '../actions'

const initialBrowserState = {}

const browserWindowReducer = (state = initialBrowserState, action: WindowActions) => {
    switch (action.type) {
        case ACTIONS.BROWSER_ON_INIT:
            return {
                ...state,
                payload: action.payload
            }
        default:
            return state
    }
}

export default combineReducers<IState>({
    browserWindow: browserWindowReducer
})
