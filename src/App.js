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
      shortTitle: 'National Portrait Gallery'
    },
    {
      title: 'National Mall, Washington, DC, USA',
      shortTitle: 'National Mall'
    },
    {
      title: 'Lincoln Memorial, 2 Lincoln Memorial Circle Northwest, Washington, DC, USA',
      shortTitle: 'Lincoln Memorial'
    },
    {
      title: 'Georgetown Waterfront Park, 3303 Water Street Northwest, Washington, DC, USA',
      shortTitle: 'Georgetown Waterfront Park'
    },
    {
      title: 'The Phillips Collection, 21st Street Northwest, Washington, DC, USA',
      shortTitle: 'The Phillips Collection'
    },
    {
      title: 'Busboys and Poets, 5th Street Northwest, Washington, DC, USA',
      shortTitle: 'Busboys and Poets'
    },
    {
      title: "Duke's Grocery, 17th Street Northwest, Washington, DC, USA",
      shortTitle: "Duke's Grocery"
    },
    {
      title: '9:30 Club, V Street Northwest, Washington, DC, USA',
      shortTitle: '9:30 Club'
    },
    {
      title: 'Roofers Union, 18th Street Northwest, Washington, DC, USA',
      shortTitle: 'Roofers Union'
    },
    {
      title: 'Founding Farmers DC, Pennsylvania Avenue Northwest, Washington, DC, USA',
      shortTitle: 'Founding Farmers DC'
    },
    {
      title: 'Thomas Jefferson Memorial, East Basin Drive Southwest, Washington, DC, USA',
      shortTitle: 'Thomas Jefferson Memorial'
    }
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
      active: true,
      filteredLocations: [],
      markersArray: [],
      clickedIndex: -1
    };

    this.makeMarkers = this.makeMarkers.bind(this)
    this.givenGeocoderRef = this.givenGeocoderRef.bind(this)
    this.onClickHandler = this.onClickHandler.bind(this)
    this.toggleClick = this.toggleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.closeWindow = this.closeWindow.bind(this)
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

  handleChange(event) {
    let filteredLocations = this.state.markersArray.filter((marker) => (marker.title.toLowerCase()).indexOf(event.target.value.toLowerCase()) > -1)

    this.setState({
      filteredLocations
    })
  }

  toggleClass = () => {
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
                    console.log('geocoding');
                    // fetch(`https://api.yelp.com/v3/businesses/${location.yelpId}`, {
                    //   method: 'GET',
                    //   mode: 'no-cors',
                    //   headers:{
                    //     'Access-Control-Allow-Origin': '*',
                    //     'Authorization': 'Bearer 8eFFaiHW7i2XiYnjfgmMME4JLpoaXAtPj7k0g-d0xZd6D-SFJylRH2I9swLh8fq-O8VuyRZJK61bjydzMpNku7Q4SGYK8g7HNJrCUsS-Bc9ECMHlALdb7O9H-sV-W3Yx'
                    //   }
                    // })//.then(res => res.json())
                    // .then(response => console.log('Success:', response))
                    // .catch(error => console.error('Error:', error));
                    
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
          <article className={`map ${this.state.active ? 'open' : ''}`}>
            <div
              className="logo-wrapper"
              onClick={this.toggleClass}
            >
              <img src={MenuIcon} alt="Open Menu" />
            </div>
            <Filter 
              handleChange={this.handleChange}
              arrayLength={this.state.filteredLocations.length}
            />
            <MapContainer
              markersArray={this.state.filteredLocations}
              giveGeocodeRef={this.givenGeocoderRef}
              clickHandler={this.onClickHandler}
              clickedIndex={this.state.clickedIndex}
              clickToggle={this.toggleClick}
              closeWindow={this.closeWindow}
            />
          </article>
          <LocationsList
            markersArray={this.state.filteredLocations}
            localGoogle={this.state.localGoogle}
            clickHandler={this.onClickHandler}
            clickToggle={this.toggleClick}
            arrayLength={this.state.filteredLocations.length}
          />
        </div>
      </div>
    );
  }
}

export default App;
