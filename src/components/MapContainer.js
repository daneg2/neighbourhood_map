import React, { Component } from 'react'
import LocationMap from "./GoogleMap.js"

class MapContainer extends Component {

  render(){
    return (
        <LocationMap
            locations={this.props.locations}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAhA-JVu5azNen7-xBfr3gMT9VVU1JybJk&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    );
  }
}

export default MapContainer