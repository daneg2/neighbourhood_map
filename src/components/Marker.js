import React, { Component } from 'react'
import { Marker } from "react-google-maps"
import MarkerIcon from "../images/marker.png";

class GoogleMarker extends Component {

  render(){
    return(
        <Marker
          position={this.props.latlng}
          icon={MarkerIcon}
        >
        </Marker>
    );
  }
}

export default GoogleMarker