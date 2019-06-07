import { AppComponentProps } from 'next/app'
import { Theme } from '@material-ui/core/styles'
import { ServerStyleSheets } from '@material-ui/styles'

export type WebpackBrowser = {
    browser: {}
}

export type MaterialPageContext = {
    theme: Theme,
    sheets: ServerStyleSheets
}

export type DocumentProps = {
    pageContext: MaterialPageContext
}

export type WindowBrowser = {
    browser: {}
}

export interface MaterialAppComponentProps extends AppComponentProps {
    pageContext: MaterialPageContext
}

export interface MainAppProps extends AppComponentProps, MaterialAppComponentProps {}
