import React, { Component } from 'react'
import './LocationsList.css'

class LocationsList extends Component {  
    render () {
        return (
            <aside className="list">
                <ul>
                    {this.props.markersArray.map((location) => {
                        return (
                            // <li key={location.title} onClick={() => {this.props.localGoogle.maps.event.trigger(location.marker, 'click');}}>           
                            <li key={location.title} onClick={() => {
                                // console.log(location.markerRef)
                                 console.log('here')
                                 this.props.localGoogle.maps.event.trigger(location, 'click');
                                // location.markerRef.current.click()
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