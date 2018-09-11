import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps'
import { mapStyles } from './mapStyles.js'
import MarkerIcon from "../images/marker.png";
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
        {props.markersArray.map((markerObject,index) => {
           return (
                <div key={markerObject.id}>
                    <Marker
                        key={markerObject.id}
                        title={markerObject.title}
                        icon={MarkerIcon}
                        position={{ lat : markerObject.lat, lng : markerObject.lng }}
                        animation={markerObject.selected ? google.maps.Animation.BOUNCE : google.maps.Animation.NONE}
                        onClick={() => {
                            props.clickHandler(index)
                            props.clickToggle(index)
                            console.log(index)
                            }
                        }
                    >  
                        {props.clickedIndex === index  && <InfoWindow onCloseClick={props.closeWindow}>
                            <p>{markerObject.title}</p>
                        </InfoWindow>}
                    </Marker>
                </div>
            )
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
            clickHandler = {this.props.clickHandler}
            clickedIndex={this.props.clickedIndex}
            clickToggle={this.props.clickToggle}
            closeWindow={this.props.closeWindow}
        />
    }
}

export default MapContainer

