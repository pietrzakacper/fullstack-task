import React from 'react'
import LoginView from './views/LoginView'
import ListView from './views/ListView'

export default class App extends React.Component {
	state = {
		sessionId: window.localStorage.getItem('sessionId')
	}

	onLoginFormSubmit = async ({ username, password }) => {
		const res = await fetch('http://localhost:3001/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		})

		if(res.status === 200) {
			const { sessionId } = await res.json()
			window.localStorage.setItem('sessionId', sessionId)
			this.setState({ sessionId })
		}
	}
	render() {
		if(this.state.sessionId) {
			return <ListView/>
		} else {
			return <LoginView onLoginFormSubmit={this.onLoginFormSubmit}/>
		}
  }
}