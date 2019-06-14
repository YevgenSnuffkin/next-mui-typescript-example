import React from 'react'
import { NextAppContext } from 'next/app'
import { store } from './store/store'
import { windowActions } from './actions'

type HocProps = {
    initialReduxState: {}
}

export const withRedux = <ComponentProps extends HocProps>(App: React.ComponentType<ComponentProps>) => {
    return class AppWithRedux extends React.Component<HocProps> {
        static async getInitialProps(appContext: NextAppContext) {
            // note: withRedux HOC is not an analogy of connect and is above Provider
            // TODO: change this to initial store.dispatch to a windowState
            const { req } = appContext.ctx
            const agent = req
                ? req.headers['user-agent']
                : 'in-app-routing'

            store.dispatch(windowActions.onInit(agent))

            return {
                initialReduxState: store,
                agent
            }
        }

        render() {
            return (
                <App
                    {...this.props}
                    initialReduxState={this.props.initialReduxState}
                />
            )
        }
    }
}
