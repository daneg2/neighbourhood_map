import React, { Component } from 'react'
import './LocationsList.css'

class LocationsList extends Component {  

    render () {
        return (
            <aside className="list">
                <ul>
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