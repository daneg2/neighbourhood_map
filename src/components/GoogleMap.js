import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps'
import { mapStyles } from './mapStyles.js'
import MarkerIcon from "../images/marker.png";
import './GoogleMap.css'

//react-google-maps wrapper to create Map
const LocationMap = withScriptjs(withGoogleMap((props, state) => {

    const google = window.google;
    //pass google object up to parent components
    props.giveGeocoderRef(google)

    return (
        <GoogleMap
        defaultZoom={13.7}
        defaultCenter={{ lat: 38.9055139, lng: -77.0347769 }}
        defaultOptions={{
            styles: mapStyles
        }}
        >
        {/* Map through markers array to create markers with custom icon and associated infowindwos */}
        {props.markersArray.map((markerObject,index) => {
        return (
                <Marker
                    key={markerObject.id}
                    title={markerObject.title}
                    icon={MarkerIcon}
                    position={{ lat : markerObject.lat, lng : markerObject.lng }}
                    // Determine whether to animate marker based on select in marker object
                    animation={markerObject.selected ? google.maps.Animation.BOUNCE : google.maps.Animation.NONE}
                     // Handle on click - pass index up to parent component
                    onClick={() => {
                        props.clickHandler(index)
                        props.clickToggle(index)
                        }
                    }
                >  
                    {/* If indexes match, display Infowindow */}
                    {props.clickedIndex === index  && <InfoWindow onCloseClick={props.closeWindow}>
                        <div className="info-content" tabIndex={0}>
                            <h2>{markerObject.shortTitle}</h2>
                            <p>Description: <span>{markerObject.description}</span></p>
                            <p>Opening hours: <span>{markerObject.openHours}</span></p>
                            <p>Rating: <span>{markerObject.rating}</span></p>
                            <p>Contact Number: <span>{markerObject.contactNumber}</span></p>
                        </div>
                    </InfoWindow>}
                </Marker>
            )
        })}
        </GoogleMap>
    )
}))

//Map wrapper
class MapContainer extends Component {  
    constructor(props) {
        super(props);
        this.state = {
            markersArray: []
        }
    }

    //Pass up google value to parent component
    givenGeocoderRef = (google) => {
        this.props.giveGeocodeRef(google)
    }

    render () {
        return <LocationMap 
            markersArray = {this.props.markersArray}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAhA-JVu5azNen7-xBfr3gMT9VVU1JybJk&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            giveGeocoderRef={this.givenGeocoderRef}
            clickHandler = {this.props.clickHandler}
            clickedIndex={this.props.clickedIndex}
            clickToggle={this.props.clickToggle}
            closeWindow={this.props.closeWindow}
        />
    }
}

export default MapContainer

