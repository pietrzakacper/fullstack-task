import React from 'react'
import './ListView.css'

export default class ListView extends React.Component {
    state = {
        newItemContent: ''
    }
    onSubmit = (event) => {
        event.preventDefault()
        const { newItemContent } = this.state
        this.props.onNewItemAdd({ newItemContent })
    }
    onNewItemChange = (event) => {
        this.setState({ newItemContent: event.target.value })
    }
    render() {
        const { items, isAdmin } = this.props
        const { newItemContent } = this.state
        return  (
            <>
            {
                isAdmin && (
                    <form onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            placeholder="Type here"
                            value={newItemContent}
                            onChange={this.onNewItemChange}
                        >
                        </input>
                        <input type="submit" value="Add"></input>
                    </form>
                )
            }
                <div>
                {
                    items.map((value, index) => (
                        <div className="list-item" key={value + index}>{value}</div>
                    ))
                }
                </div>
            </>
        )
    }
}