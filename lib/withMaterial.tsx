import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider, StylesProvider, ServerStyleSheets } from '@material-ui/styles'
import { MaterialPageContext, WebpackBrowser, MainAppProps } from '../types'
import theme from '../theme/theme'

// withMaterial wraps <App> in the Material UI Theme and Styles providers.

// noStylesGeneration prop is optional - but handy if using eg apollo's getDataFromTree, where it can be passed in app props.
// Setting to true speeds up processing as sheets are not made.
type WithMaterialProps = {
    noStylesGeneration?: boolean
}

export default (App: React.ComponentClass<MainAppProps>) => {
    return class WithMaterial extends React.Component<WithMaterialProps> {
        static displayName: string = `WithMaterial(${App.displayName})`
        private pageContext: MaterialPageContext | null

        constructor(props: WithMaterialProps) {
            super(props)

            this.pageContext = this.getInitialContext()
        }

        get pageContextObject() {
            return {
                theme,
                sheets: new ServerStyleSheets()
            }
        }

        getInitialContext() {
            const browser = (process as never as WebpackBrowser).browser

            if (!browser || !this.pageContext) {
                return this.pageContextObject
            }

            return null
        }

        render() {
            const { noStylesGeneration } = this.props

            return this.pageContext ? (
                <ThemeProvider theme={this.pageContext.theme}>
                    <StylesProvider disableGeneration={noStylesGeneration}>
                        <CssBaseline />
                        <App
                            {...this.props}
                            pageContext={this.pageContext}
                        />
                    </StylesProvider>
                </ThemeProvider>
            ) : null
        }
    }
}
