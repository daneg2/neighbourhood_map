import React, { Component } from 'react'
import './Filter.css'

class Filter extends Component {  
    render () {
        return (
            <div className="filter-container">
                <input type="search" placeholder="Filter locations" onChange={this.props.handleChange} role="search"
              aria-label="Filter Locations On Change "/>
                {this.props.arrayLength <= 0 && <p>No locations have been found.</p>}
            </div>
        )
    }
}

export default Filter