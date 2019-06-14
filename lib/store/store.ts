import { createStore, applyMiddleware, compose } from 'redux'
import { middlewares } from './middlewares'
import createRootReducer from './root-reducer'

export type IState = {}

export const store = createStore<IState>(
    createRootReducer,
    compose(applyMiddleware(...middlewares))
)
