import React, { Component } from 'react';
import MapContainer from './components/GoogleMap.js'
import Filter from './components/Filter.js'
import LocationsList from './components/LocationsList.js'
import './App.css'
import MenuIcon from "./images/menu.svg";


class App extends Component {

  //Location details with FourSquare ID's
  locations = [
    {
      title: 'National Portrait Gallery, Washington, DC, USA',
      shortTitle: 'National Portrait Gallery',
      fourSqId: "49fb25a6f964a520196e1fe3"
    },
    {
      title: 'Founding Farmers DC, Pennsylvania Avenue Northwest, Washington, DC, USA',
      shortTitle: 'Founding Farmers DC',
      fourSqId: "4a469855f964a5202aa91fe3"
    },
    {
      title: 'Thomas Jefferson Memorial, East Basin Drive Southwest, Washington, DC, USA',
      shortTitle: 'Thomas Jefferson Memorial',
      fourSqId: "4a106621f964a520ba761fe3"
    },
    {
      title: 'Georgetown Cupcake, M Street Northwest, Washington, DC, USA',
      shortTitle: 'Georgetown Cupcake',
      fourSqId: "4b509bc7f964a520442927e3"
    },
    {
      title: 'Shenanigan’s Irish Pub, 18th Street Northwest, Washington, DC, USA',
      shortTitle: 'Shenanigan’s Irish Pub',
      fourSqId: "513a9d88e4b0dcaa86f3b270"
    },
    {
      title: 'National Mall, Washington, DC, USA',
      shortTitle: 'National Mall',
      fourSqId: '49c2fff9f964a5204d561fe3'
    },
    {
      title: '9:30 Club, V Street Northwest, Washington, DC, USA',
      shortTitle: '9:30 Club',
      fourSqId: '3fd66200f964a520bbf11ee3'
    },
    {
      title: 'Lincoln Memorial, 2 Lincoln Memorial Circle Northwest, Washington, DC, USA',
      shortTitle: 'Lincoln Memorial',
      fourSqId: '4a4fbaecf964a520a0af1fe3'
    },
    {
      title: 'Georgetown Waterfront Park, 3303 Water Street Northwest, Washington, DC, USA',
      shortTitle: 'Georgetown Waterfront Park',
      fourSqId: '4bb653082f70c9b68b3d8530'
    },
    {
      title: 'The Phillips Collection, 21st Street Northwest, Washington, DC, USA',
      shortTitle: 'The Phillips Collection',
      fourSqId: '4a355205f964a520cc9c1fe3'
    }
  ]

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      filteredLocations: [],
      markersArray: [],
      clickedIndex: -1,
      focusElement: {}
    };
  }

  //Close InfoWindow
  closeWindow = () => {
    this.setState({
      clickedIndex: -1
    })
  }

  //Determine which element clicked, to show infowindow of correct marker
  toggleClick = (index) => {
    this.setState({
      clickedIndex: index
    })
  }

  //Pass up reference to list DOM element
  getRef = (elementRef) => {
    this.setState({
      focusElement: elementRef
    })
  }

  //Focus on passed up reference
  focusRef = () => this.state.focusElement.current.focus()
  
  //Handle click of lists and markers
  onClickHandler = (markerIndex) => {
    //determine which marker clicked
    let changedMarker = this.state.filteredLocations[markerIndex]
    //change selected value to determine whether animate
    changedMarker.selected = !changedMarker.selected

    this.setState((prevState) => ({filteredLocations: [...prevState.filteredLocations, ...{[markerIndex]:changedMarker}]}), () => {
      setTimeout(() => {
        let changedMarker = this.state.filteredLocations[markerIndex]
        changedMarker.selected = !changedMarker.selected
        this.setState((prevState) => ({filteredLocations: [...prevState.filteredLocations, ...{[markerIndex]:changedMarker}]}))
      }, 1000)
    })
  }

  //Filter array - marker full title with user input
  handleChange = (event) => {
    let filteredLocations = this.state.markersArray.filter((marker) => (marker.title.toLowerCase()).indexOf(event.target.value.toLowerCase()) > -1)
    //Set new filtered array
    this.setState({
      filteredLocations
    })
  }

  //Hide and show side menu
  toggleClass = () => {
    !this.state.active && this.focusRef()
    this.setState({ active: !this.state.active })
   
  };

  //Create markers object
  //Find lat/lngs/ids with Geocoder library
  //Fetch extra information from Foursquare API
  //Spread into markersarray, also add selected attribute (which determines animations)
  //When done, set filterLocations state to that of markersArray (array to be filtered with handleChange)

  makeMarkers = (locationsLatLng) => {
    const { localGoogle } = this.state

    let geocoder = new localGoogle.maps.Geocoder();

    locationsLatLng.map((location) =>   
        geocoder.geocode(
            { address: location.title }, (results, status) => {
                if (status === localGoogle.maps.GeocoderStatus.OK) {
                    let lat = results[0].geometry.location.lat()
                    let lng = results[0].geometry.location.lng()
                    let id = results[0].place_id
                    // Fetch data from Foursquare API
                    fetch(`https://api.foursquare.com/v2/venues/${location.fourSqId}?client_id=K0NSQKZ5G1PDCW3YN0GLC1DTUTKS02JXWZNTHWGQBAV2WSZ5&client_secret=N0SNJX2UX0EZQQJZPKSHJHR4FM5NMETHWBFTXHCQ53ANVQVA&v=20180901`, {
                      method: 'GET',
                    }).then(res => res.json())
                    .then(response => {
                      console.log('Request succeeded:', response)
                      let contactNumber = response.response.venue && response.response.venue.contact ? response.response.venue.contact.formattedPhone : 'No contact number available.'
                      let rating = response.response.venue && response.response.venue.rating ? response.response.venue.rating : 'No rating available.'
                      let openHours = response.response.venue && response.response.venue.hours && response.response.venue.hours.richStatus ? response.response.venue.hours.richStatus.text : 'No opening hours available.'
                      let description = response.response.venue && response.response.venue.description ? response.response.venue.description : 'No description available'
                      this.setState((prevState) => {
                        return {markersArray: [...prevState.markersArray, {shortTitle: location.shortTitle, title: location.title, lat: lat, lng: lng, id: id, selected: false, contactNumber, description, rating, openHours }]}
                      }, () => {
                      this.setState({
                        filteredLocations: this.state.markersArray
                      })
                      })
 
                    })
                    .catch(error => alert('Request failed:', error));
                } else {
                    alert('Error:', status)
                    console.error('Error:', status)
                }
            }
        )
    )
  }

  //set localGoogle variable passed up from child component(if hasn't been set before), once passed up: call makeMarkers
  givenGeocoderRef = (google) => {
    if (!this.state.localGoogle) {
      this.setState({ localGoogle: google }, () => {
        this.makeMarkers(this.locations)
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          {/* Determine if sidemenu open or not */}
          <article role="main" className={`${this.state.active ? 'open' : ''}`}>
            <button
              className="logo-wrapper"
              onClick={this.toggleClass} 
              aria-haspopup="true"
              aria-label="Toggle Primary Menu"
              aria-controls="aside"
              tabIndex = {0}
            >
              <img src={MenuIcon} alt="Toggle Primary Menu" />
            </button>
            {/* Filter Component which will filter the array and only display name and markers of locations in array */}
            <Filter 
              handleChange={this.handleChange}
              arrayLength={this.state.filteredLocations.length}
            />
            {/* Map Component which will contain the Google Map */}
            <div className="map-container" tabIndex={0} role="application" aria-label="Google Map of Washington, DC">
              <MapContainer
                markersArray={this.state.filteredLocations}
                giveGeocodeRef={this.givenGeocoderRef}
                clickHandler={this.onClickHandler}
                clickedIndex={this.state.clickedIndex}
                clickToggle={this.toggleClick}
                closeWindow={this.closeWindow}
              />
            </div>
          </article>
          {/* Sidemenu Component */}
          <LocationsList
            markersArray={this.state.filteredLocations}
            localGoogle={this.state.localGoogle}
            clickHandler={this.onClickHandler}
            clickToggle={this.toggleClick}
            arrayLength={this.state.filteredLocations.length}
            getRef={this.getRef}
            activeMenu={this.state.active}
          />
        </div>
      </div>
    );
  }
}

export default App;
