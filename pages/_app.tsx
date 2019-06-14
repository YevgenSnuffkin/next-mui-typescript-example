import React from 'react'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { MainAppProps } from '../types'
import { withRedux } from '../lib/withRedux'
import theme from '../theme/theme'

interface ExtendedAppProps extends MainAppProps {
    initialReduxState: Store<{}>,
    agent: string
}

const isServer = typeof window === 'undefined'

class MainApp extends App<ExtendedAppProps> {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')

        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles)
        }
    }

    renderWithoutStore() {
        const { Component, pageProps, pageContext, router } = this.props

        return (
            <Component
                {...pageProps}
                pageContext={pageContext}
                router={router}
                agent={this.props.agent}
            />
        )
    }

    renderWithStore() {
        const { initialReduxState } = this.props

        return (
            <Provider store={initialReduxState}>
                {this.renderWithoutStore()}
            </Provider>
        )
    }

    renderComponent() {
        return isServer
            ? this.renderWithStore()
            : this.renderWithoutStore()
    }

    render() {
        const { query } = this.props.router
        const id = query ? query.id : ''

        return (
            <Container>
                <Head>
                    <title>SSR_Example</title>
                    <meta property="og:title" content={`Example SSR, slug is: ${id}`}/>
                    <meta property="og:type" content="vegan"/>
                    <meta property="og:image" content="yolo.jpg"/>
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    {this.renderComponent()}
                </ThemeProvider>
            </Container>
        )
    }
}

export default withRedux(MainApp)
