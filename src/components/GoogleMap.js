import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps'
import { mapStyles } from './mapStyles.js'
import './GoogleMap.scss'

const LocationMap = withScriptjs(withGoogleMap((props, state) => {

    const google = window.google;
   
    props.giveGeocoderRef(google)

    return (
        <GoogleMap
        defaultZoom={13.7}
        defaultCenter={{ lat: 38.9055139, lng: -77.0347769 }}
        defaultOptions={{
            styles: mapStyles
        }}
        >
        {props.markersArray.map((marker) => {
            return marker.marker
        })}
        </GoogleMap>
    )
}))

class MapContainer extends Component {  
    constructor(props) {
        super(props);
        this.state = {
            markersArray: []
        }
        this.givenGeocoderRef = this.givenGeocoderRef.bind(this)
    }

    givenGeocoderRef = (google) => {
        this.props.giveGeocodeRef(google)
        if (!this.state.localGoogle) {
            this.setState({localGoogle: google})
        }
    }

    render () {
        return <LocationMap 
            markersArray = {this.props.markersArray}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAhA-JVu5azNen7-xBfr3gMT9VVU1JybJk&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            giveGeocoderRef={this.givenGeocoderRef}
        />
    }
}

export default MapContainer

