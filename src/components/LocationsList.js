import React, { Component } from 'react'
import './LocationsList.css'

class LocationsList extends Component {  

    render () {
        return (
            <aside className="list-container">
                <div className="heading">
                    <h2>Daytripper in DC</h2>
                    <p>All the must-see locations in Washington, DC for when you don't have a lot of time.</p>
                </div>
                {this.props.arrayLength <= 0 && <p className="response">Oops! Seems like we couldn't find your location - try again!</p>}
                <ul className="list">
                    {this.props.markersArray.map((location, index) => {
                        return (
                            // <li key={location.title} onClick={() => {this.props.localGoogle.maps.event.trigger(location.marker, 'click');}}>           
                            <li key={location.title} onClick={() => {
                                    this.props.clickHandler(index)
                                    this.props.clickToggle(index)
                                }}>           
                                {location.shortTitle}
                            </li>  
                        )
                    })}
                </ul>
            </aside>
        )
    }
}

export default LocationsList