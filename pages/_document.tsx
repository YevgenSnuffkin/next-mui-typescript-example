import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import Document, { Head, Main, NextScript, NextDocumentContext } from 'next/document'
import flushToReact from 'styled-jsx/server'
import { ServerStyleSheets } from '@material-ui/styles'
import theme from '../theme/theme'

class MyDocument extends Document {
    static async getInitialProps(ctx: NextDocumentContext) {
        const sheet = new ServerStyleSheet()
        const sheets = new ServerStyleSheets()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: App => props => ({
                    ...sheet.collectStyles(<App {...props}/>),
                    ...sheets.collect(<App {...props}/>)
                })
            })
            const initialProps = await Document.getInitialProps(ctx)

            return {
                ...initialProps,
                styles: (
                    <React.Fragment>
                        {sheets.getStyleElement()}
                        {sheet.getStyleElement()}
                        {flushToReact() || null}
                    </React.Fragment>
                )
            }
        } finally {
            sheet.seal()
        }
  }

  render() {
        return (
            <html lang="en" dir="ltr">
                <Head>
                    <meta charSet="utf-8" />
                        {/* Use minimum-scale=1 to enable GPU rasterization */}
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />
                    {/* PWA primary color */}
                    <meta
                        name="theme-color"
                        content={theme.palette.primary.main}
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}

export default MyDocument
