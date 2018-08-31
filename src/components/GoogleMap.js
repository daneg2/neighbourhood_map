import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps'
import GoogleMarker from './Marker.js'
import './GoogleMap.scss'

// get location names passed down from app.js
// need to find lat lng and info within withScripts
// markers to be added in outside function after lat/lng has been populated
// within withScripts, find lat lng

//location map is a stateless functional component with no render/lifecycle/constructor

//called within mapcontainer which does have but can't pass anything

const LocationMap = withScriptjs(withGoogleMap((props) => {

    const google = window.google;
    let geocoder = new google.maps.Geocoder();

    props.locationsArray.map( location => {
        geocoder.geocode(
            { address: location.title }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                let lat = results[0].geometry.location.lat()
                let lng = results[0].geometry.location.lng()
                var id = results[0].place_id

                var marker = {key: id, place: location.title, location:{lat: {lat}, lng: {lng}}}

                // var marker = <GoogleMarker
                //      key={id}
                //      place={location.title}
                //     location={{lat: {lat}, lng: {lng}}}
                // />

                //to be replaced by function in component below
                // locationsLatLng.push(
                //     <GoogleMarker
                //     key={id}
                //     place={location.title}
                //     location={{lat: {lat}, lng: {lng}}}
                //     />
                // )

                props.addMarker(marker)
               
            } else {
                window.alert('No luck finding that location - please try again!');
            }
            }
        )
    });

    

    return (
        <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 38.9055139, lng: -77.0347769 }}
        defaultOptions={{
            styles: 
            [
                {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#000"
                        },
                        {
                            "weight": "3"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "saturation": "-100"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 20
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                },
                {
                    "featureType": "administrative.locality",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "administrative.neighborhood",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "lightness": "80"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        },
                        {
                            "color": "#797979"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural.landcover",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural.terrain",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5eeb2"
                        },
                        {
                            "lightness": 21
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#fecf00"
                        },
                        {
                            "weight": "3.00"
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#f8edbf"
                        },
                        {
                            "gamma": "0.6"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#f1c609"
                        },
                        {
                            "weight": "4.00"
                        }
                    ]
                },
                {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "weight": "1"
                        },
                        {
                            "gamma": "0.6"
                        },
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#656565"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#c6c6c6"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#b1b1b1"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#bdbdbd"
                        },
                        {
                            "lightness": 19
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "lightness": 17
                        },
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#d0d8da"
                        }
                    ]
                }
            ]
        }}
        >
        <GoogleMarker 
            location = {{lat: 38.9055139, lng: -77.0347769 }}
        />
        </GoogleMap>
    )
}))

class MyApp extends Component {  
    constructor(props) {
        super(props);
        this.state = {
            locationsLatLng: []
        };
    }

    addMarker = (marker) => {
        console.log(marker)
        // this.setState({locationsLatLng: [...this.state.locationsLatLng, {marker}] })
        // var newArray = this.state.locationsLatLng.concat(marker);
        // console.log(newArray)
        // this.setState({locationsLatLng: newArray})
    }

    render () {
        return <LocationMap 
            locationsArray = {this.props.locationsLatLng}
            addMarker = {this.addMarker}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAhA-JVu5azNen7-xBfr3gMT9VVU1JybJk&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    }
}

export default MyApp

