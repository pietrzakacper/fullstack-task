import React from 'react'
import LoginView from './views/LoginView'
import ListView from './views/ListView'
import { SERVER_URL } from './utils/constants'

export default class App extends React.Component {
	state = {
		sessionId: window.localStorage.getItem('sessionId'),
		isAdmin: !!window.localStorage.getItem('isAdmin') || false,
		items: []
	}

	componentDidMount() {
		if(this.state.sessionId) {
			this.loadItems()
		}
	}

	onLoginFormSubmit = async ({ username, password }) => {
		const res = await fetch(`${SERVER_URL}/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		})

		if(res.status === 200) {
			const { sessionId, isAdmin } = await res.json()
			window.localStorage.setItem('sessionId', sessionId)
			window.localStorage.setItem('isAdmin', isAdmin)
			this.setState({ sessionId, isAdmin }, this.loadItems)
		}
	}

	// with more items in real-life app I wouldn't fetch the whole list
	loadItems = async () => {
		const { sessionId } = this.state

		const res = await fetch(`${SERVER_URL}/getList`, {
			headers: { 'Authorization': sessionId }
		})

		if(res.status === 200) {
			const { items } = await res.json()
			this.setState({ items })
		}
	}

	onNewItemAdd = async ({ newItemContent }) => {
		const { sessionId } = this.state

		await fetch(`${SERVER_URL}/addItem`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': sessionId
			},
			body: JSON.stringify({ newItemContent })
		})

		this.loadItems()
	}

	render() {
		const { sessionId, isAdmin, items } = this.state

		if(sessionId) {
			return <ListView items={items} isAdmin={isAdmin} onNewItemAdd={this.onNewItemAdd}/>
		} else {
			return <LoginView onLoginFormSubmit={this.onLoginFormSubmit}/>
		}
  }
}