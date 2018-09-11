import React, { Component } from 'react'
import './Filter.css'

class Filter extends Component {  
    render () {
        return (
            <div>
                <label>
                    Looking for something?
                    <input type="text" placeholder="Search here" onChange={this.props.handleChange} />
                </label>
                {this.props.arrayLength <= 0 && <p>No results have been found.</p>}
            </div>
        )
    }
}

export default Filter