import React, { Component } from 'react'
import './Filter.css'

class Filter extends Component {  
    render () {
        return (
            <div className="filter-container">
                <input type="text" placeholder="Filter locations" onChange={this.props.handleChange} />
                {this.props.arrayLength <= 0 && <p>No locations have been found.</p>}
            </div>
        )
    }
}

export default Filter