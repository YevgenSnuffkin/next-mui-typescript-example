import React from 'react'
import App, { Container } from 'next/app'
import withMaterial from '../lib/withMaterial'
import { MainAppProps } from '../types'

class MainApp extends App<MainAppProps> {
    render() {
        // pageContext is from withMaterial
        const { Component, pageProps, pageContext } = this.props

        return (
            <Container>
                <Component
                    {...pageProps}
                    pageContext={pageContext}
                />
            </Container>
        )
    }
}

export default withMaterial(MainApp)
