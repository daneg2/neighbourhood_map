import React, { Component } from 'react'
import './Filter.css'

class Filter extends Component {  
    render () {
        return (
            <div className="filter-container">
                <input type="search" placeholder="Filter locations" onChange={this.props.handleChange} role="search"
              aria-label="Filter Locations"/>
                {this.props.arrayLength <= 0 && <p tabIndex={0} aria-label="No locations have been found">No locations have been found.</p>}
            </div>
        )
    }
}

export default Filter