import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps'
import GoogleMarker from './Marker.js'
import { mapStyles } from './mapStyles.js'
import './GoogleMap.scss'

const LocationMap = withScriptjs(withGoogleMap((props, state) => {

    const google = window.google;
   
    props.giveGeocoderRef(google)

    return (
        <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 38.9055139, lng: -77.0347769 }}
        defaultOptions={{
            styles: mapStyles
        }}
        >
        {console.log(props.markersArray)}
        {props.markersArray.map((marker) => {
            return marker
        })}
        </GoogleMap>
    )
}))

class MyApp extends Component {  
    constructor(props) {
        super(props);
        this.state = {
            markersArray: []
        }
        this.givenGeocoderRef = this.givenGeocoderRef.bind(this)
        this.makeMarkers = this.makeMarkers.bind(this)
    }

    makeMarkers = (locationsLatLng) => {
        const { localGoogle } = this.state

        let geocoder = new localGoogle.maps.Geocoder();
        locationsLatLng.map((location) => {
            
            geocoder.geocode(
                { address: location.title }, (results, status) => {
                    if (status === localGoogle.maps.GeocoderStatus.OK) {
                        let lat = results[0].geometry.location.lat()
                        let lng = results[0].geometry.location.lng()
                        var id = results[0].place_id

                        console.log(lat)
    
                        var marker = <GoogleMarker
                             key={id}
                             place={location.title}
                            location={{lat: lat, lng: lng}}
                        />
                        
                       this.setState((prevState) => {
                           console.log(prevState)
                           return {markersArray: [...prevState.markersArray, marker]}

                       })
                        //to be replaced by function in component below

                    } else {
                        // console.error('No luck finding that location - please try again!');
                        console.error(status)
                    }
                }
            )
        })
        
        // this.locationMapRef.current.runGeocodeOn(this.props.locationsLatLng[0])
    }

    givenGeocoderRef = (google) => {
        if (!this.state.localGoogle) {
            this.setState({localGoogle: google}, () => {
                this.makeMarkers(this.props.locationsLatLng)
            })
        }
    }

    render () {
        return <LocationMap 
            markersArray = {this.state.markersArray}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAhA-JVu5azNen7-xBfr3gMT9VVU1JybJk&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            giveGeocoderRef={this.givenGeocoderRef}
        />
    }
}

export default MyApp

