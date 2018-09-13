import React, { Component } from 'react';
import MapContainer from './components/GoogleMap.js'
import Filter from './components/Filter.js'
import LocationsList from './components/LocationsList.js'
import './App.css'
import MenuIcon from "./images/menu.svg";


class App extends Component {

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
    }
    // {
    //   title: 'National Portrait Gallery, Washington, DC, USA',
    //   shortTitle: 'National Portrait Gallery'
    // },
    // {
    //   title: 'National Mall, Washington, DC, USA',
    //   shortTitle: 'National Mall'
    // },
    // {
    //   title: 'Lincoln Memorial, 2 Lincoln Memorial Circle Northwest, Washington, DC, USA',
    //   shortTitle: 'Lincoln Memorial'
    // },
    // {
    //   title: 'Georgetown Waterfront Park, 3303 Water Street Northwest, Washington, DC, USA',
    //   shortTitle: 'Georgetown Waterfront Park'
    // },
    // {
    //   title: 'The Phillips Collection, 21st Street Northwest, Washington, DC, USA',
    //   shortTitle: 'The Phillips Collection'
    // },
    // {
    //   title: 'Busboys and Poets, 5th Street Northwest, Washington, DC, USA',
    //   shortTitle: 'Busboys and Poets'
    // },
    // {
    //   title: "Duke's Grocery, 17th Street Northwest, Washington, DC, USA",
    //   shortTitle: "Duke's Grocery"
    // },
    // {
    //   title: '9:30 Club, V Street Northwest, Washington, DC, USA',
    //   shortTitle: '9:30 Club'
    // },
    // {
    //   title: 'Roofers Union, 18th Street Northwest, Washington, DC, USA',
    //   shortTitle: 'Roofers Union'
    // },
    // {
    //   title: 'Founding Farmers DC, Pennsylvania Avenue Northwest, Washington, DC, USA',
    //   shortTitle: 'Founding Farmers DC'
    // },
    // {
    //   title: 'Thomas Jefferson Memorial, East Basin Drive Southwest, Washington, DC, USA',
    //   shortTitle: 'Thomas Jefferson Memorial'
    // }
    // {
    //   title: 'Georgetown Cupcake, M Street Northwest, Washington, DC, USA',
    //   shortTitle: 'Georgetown Cupcake'
    // },
    // {
    //   title: 'Rock Creek National Park, Washington, DC, USA',
    //   shortTitle: 'Rock Creek National Park'
    // },
    // {
    //   title: 'Shenanigan’s Irish Pub, 18th Street Northwest, Washington, DC, USA',
    //   shortTitle: 'Shenanigan’s Irish Pub'
    // }
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

  closeWindow = () => {
    this.setState({
      clickedIndex: -1
    })
  }

  toggleClick = (index) => {
    this.setState({
      clickedIndex: index
    })
  }

  getRef = (elementRef) => {
    this.setState({
      focusElement: elementRef
    })
  }

  focusRef = () => this.state.focusElement.current.focus()
  

  onClickHandler = (markerIndex) => {
    let changedMarker = this.state.filteredLocations[markerIndex]
    changedMarker.selected = !changedMarker.selected
    //update spreading to add new infoWindowOpen - not get switched off after timeout. Only get set once 
    // close icon clicked
    this.setState((prevState) => ({filteredLocations: [...prevState.filteredLocations, ...{[markerIndex]:changedMarker}]}), () => {
      setTimeout(() => {
        let changedMarker = this.state.filteredLocations[markerIndex]
        changedMarker.selected = !changedMarker.selected
        this.setState((prevState) => ({filteredLocations: [...prevState.filteredLocations, ...{[markerIndex]:changedMarker}]}))
      }, 1000)
    })
  }

  handleChange = (event) => {
    let filteredLocations = this.state.markersArray.filter((marker) => (marker.title.toLowerCase()).indexOf(event.target.value.toLowerCase()) > -1)

    this.setState({
      filteredLocations
    })
  }

  toggleClass = () => {
    !this.state.active && this.focusRef()
    this.setState({ active: !this.state.active })
   
  };

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
                    fetch(`https://api.foursquare.com/v2/venues/${location.fourSqId}?client_id=WZ3MLQ44JEPF2ODUCOJDJD2YI1CTD2CWRIHH53LRLTD3XDME&client_secret=MPWM4RG1SMUCQ51LAXVD3BCZR0NJENXBMCAIEYORTX3EFWQE&v=20180901`, {
                      method: 'GET',
                    }).then(res => res.json())
                    .then(response => console.log('Success:', response))
                    .catch(error => console.error('Error:', error));
                    
                   this.setState((prevState) => {
                       return {markersArray: [...prevState.markersArray, {shortTitle: location.shortTitle, title: location.title, lat: lat, lng: lng, id: id, selected: false }]}
                   }, () => {
                    this.setState({
                      filteredLocations: this.state.markersArray
                    })
                   })
                    //to be replaced by function in component below

                } else {
                    // console.error('No luck finding that location - please try again!');
                    console.error(status)
                }
            }
        )
    })
  }

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
          <article role="main" className={`map ${this.state.active ? 'open' : ''}`}>
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
            <Filter 
              handleChange={this.handleChange}
              arrayLength={this.state.filteredLocations.length}
            />
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
