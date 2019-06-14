import { ActionsUnion, createAction } from './helpers'

export enum ACTIONS {
    BROWSER_ON_INIT = 'BROWSER_ON_INIT'
}

export type WindowActions = ActionsUnion<typeof productActions>

export const windowActions = {
    onInit: (payload?: string) => createAction(ACTIONS.BROWSER_ON_INIT, payload),
}
