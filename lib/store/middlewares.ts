import { Middleware } from 'redux'
import { createLogger } from 'redux-logger'

const logger = createLogger({
    predicate: () => !(process.env.NODE_ENV === 'production')
})

export const middlewares: Array<Middleware> = [
    logger
]
