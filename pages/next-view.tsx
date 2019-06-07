import React from 'react'
import api from '../api/api'
import { Button } from '@material-ui/core'

export default class SecondPage extends React.Component {
    state: { isLoading: boolean } = {
        isLoading: true
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        this.setState({
            isLoading: true
        })

        api().then(()=> this.setState({
            isLoading: false
        }))
    }

    render() {
        return !this.state.isLoading ? (
            <div>
                HomePage
                <Button onClick={() => this.fetchData()}>
                    fetch again
                </Button>
            </div>
        ) : (
            <p>loading</p>
        )
    }
}
