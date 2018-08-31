import React, { Component } from 'react'
import MyApp from "./GoogleMap.js"

class MapContainer extends Component {

  render(){
    return (
        <MyApp
            locationsLatLng={this.props.locations}
        />
    );
  }
}

export default MapContainer