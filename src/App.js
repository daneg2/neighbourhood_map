import React, { Component } from 'react';
import MapContainer from './components/GoogleMap.js'
import LocationsList from './components/LocationsList.js'
import './App.css'
import MenuIcon from "./images/menu.svg";


class App extends Component {

  locations = [
    {
      title: 'National Portrait Gallery, Washington, DC, USA',
      shortTitle: 'National Portrait Gallery',
      yelpId: "KVcGvgj_p4rQmmAYOV14jA"
    },
    {
      title: 'Founding Farmers DC, Pennsylvania Avenue Northwest, Washington, DC, USA',
      shortTitle: 'Founding Farmers DC',
      yelpId: "VA8aPObRynlwR1TGzbzraQ"
    },
    {
      title: 'Thomas Jefferson Memorial, East Basin Drive Southwest, Washington, DC, USA',
      shortTitle: 'Thomas Jefferson Memorial',
      yelpId: "iB4f8gZkUJICgrhyAoKa-w"
    },
    {
      title: 'Georgetown Cupcake, M Street Northwest, Washington, DC, USA',
      shortTitle: 'Georgetown Cupcake',
      yelpId: "eaf-pRz8ulVF3UZe8nB2Xw"
    },
    {
      title: 'Shenanigan’s Irish Pub, 18th Street Northwest, Washington, DC, USA',
      shortTitle: 'Shenanigan’s Irish Pub',
      yelpId: "4RoSn6IjCeqq4au4kma44Q"
    }
  ]

  constructor(props) {
    super(props);
    this.state = {
      active: true,
      filteredLocations: this.locations,
      markersArray: []
    };

    this.makeMarkers = this.makeMarkers.bind(this)
    this.givenGeocoderRef = this.givenGeocoderRef.bind(this)
    this.onClickHandler = this.onClickHandler.bind(this)

  }

  onClickHandler = (markerIndex) => {
    let changedMarker = this.state.markersArray[markerIndex]
    changedMarker.selected = !changedMarker.selected
    //update spreading to add new infoWindowOpen - not get switched off after timeout. Only get set once 
    // close icon clicked
    this.setState((prevState) => ({markersArray: [...prevState.markersArray, ...{[markerIndex]:changedMarker}]}), () => {
      setTimeout(() => {
        let changedMarker = this.state.markersArray[markerIndex]
        changedMarker.selected = !changedMarker.selected
        this.setState((prevState) => ({markersArray: [...prevState.markersArray, ...{[markerIndex]:changedMarker}]}))
      }, 1000)
    })
  }

  toggleClass = () => {
    this.setState({ active: !this.state.active })
  };

  makeMarkers = (locationsLatLng) => {
    const { localGoogle } = this.state

    let geocoder = new localGoogle.maps.Geocoder();
    let markerRef = React.createRef()

    locationsLatLng.map((location) => {
        
        geocoder.geocode(
            { address: location.title }, (results, status) => {
                if (status === localGoogle.maps.GeocoderStatus.OK) {
                    let lat = results[0].geometry.location.lat()
                    let lng = results[0].geometry.location.lng()
                    var id = results[0].place_id
                  
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
            <MapContainer
              markersArray={this.state.markersArray}
              giveGeocodeRef={this.givenGeocoderRef}
              clickHandler={this.onClickHandler}
            />
          </article>
          <LocationsList
            markersArray={this.state.markersArray}
            localGoogle={this.state.localGoogle}
            clickHandler={this.onClickHandler}
          />
        </div>
      </div>
    );
  }
}

export default App;
