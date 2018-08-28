import React, { Component } from 'react';
import MapContainer from './components/MapContainer.js'
import './App.css'
import MenuIcon from "./images/menu.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        active: true,
        locations: {

        }
    };
  }

  toggleClass = () => {
    this.setState({ active: !this.state.active})
  };

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <article className={`map ${this.state.active ? 'open' : ''}`}>
            <div 
              className="logo-wrapper"
              onClick={this.toggleClass}
            >
              <img src={MenuIcon} alt="Open Menu"/>
            </div>
            <MapContainer />
          </article>
          <aside className="aside list">Aside 1</aside>
        </div>
      </div>
    );
  }
}

export default App;
