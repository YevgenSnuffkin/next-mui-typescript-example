import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext,
  AnyPageProps
} from 'next/document'
import React from 'react'
import { MaterialPageContext, DocumentProps } from '../types'

class MyDocument extends Document<DocumentProps> {
    pageContext: MaterialPageContext | null = null

    async getInitialProps(ctx: NextDocumentContext) {
        // Resolution order
        //
        // On the server:
        // 1. app.getInitialProps
        // 2. page.getInitialProps
        // 3. document.getInitialProps
        // 4. app.render
        // 5. page.render
        // 6. document.render
        //
        // On the server with error:
        // 1. document.getInitialProps
        // 2. app.render
        // 3. page.render
        // 4. document.render
        //
        // On the client
        // 1. app.getInitialProps
        // 2. page.getInitialProps
        // 3. app.render
        // 4. page.render

        // Render app and page and get the context of the page with collected side effects.

        const page = ctx.renderPage(Component => (props: AnyPageProps) => {
            // pageContext may be undefined in case of error
            this.pageContext = props.pageContext

            const component = this.pageContext ? (
                this.pageContext.sheets.collect(<Component {...props}/>)
            ) : (
                <Component {...props}/>
            )

            return component
        })
        const styles = this.pageContext
            ? this.pageContext.sheets.getStyleElement()
            : (<style/>)

        return {
            ...page,
            pageContext: this.pageContext,
            // Styles fragment is rendered after the app and page rendering finish.
            styles
        }
    }

    render() {
        const { pageContext } = this.props
        const content = pageContext
            ? pageContext.theme.palette.primary.main
            : undefined

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
                        content={content}
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
                    />
                    <title>
                        Web Skanerka
                    </title>
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
