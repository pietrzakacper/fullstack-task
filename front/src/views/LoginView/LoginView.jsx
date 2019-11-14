import React from 'react'

export default class LoginView extends React.Component {
    state = {
        username: '',
        password: ''
    }
    onChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }
    onSubmit = (event) => {
        event.preventDefault()
        this.props.onLoginFormSubmit(this.state)
    }
    render() {
        const { username, password } = this.state

        return <>
            <form onSubmit={this.onSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={this.onChange}></input>
                {' '}
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={this.onChange}></input>
                <br/>
                <input type="submit" value="Login"></input>
            </form>
        </>
    }
}