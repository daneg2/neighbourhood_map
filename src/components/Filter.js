import React, { Component } from 'react'
import './Filter.css'

class Filter extends Component {  
    render () {
        return (
            //On change of input, call handleChange function in parent function
            <div className="filter-container">
                <input type="search" placeholder="Filter locations" onChange={this.props.handleChange} role="search"
              aria-label="Filter Locations"/>
                {/* If no items in array, display 'No Results' message */}
                {this.props.arrayLength <= 0 && <p tabIndex={0} aria-label="No locations have been found">No locations have been found.</p>}
            </div>
        )
    }
}

export default Filter