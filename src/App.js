import React, { Component } from 'react';
import MapContainer from './components/MapContainer.js'
import './App.css'
import MenuIcon from "./images/menu.svg";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        active: true,
        locations: [
          {title: 'National Portrait Gallery, Washington, DC, USA'},
          {title: 'National Mall, Washington, DC, USA'},
          {title: 'Founding Farmers DC, Pennsylvania Avenue Northwest, Washington, DC, USA'},
          {title: 'Thomas Jefferson Memorial, East Basin Drive Southwest, Washington, DC, USA'},
          {title: 'Georgetown Cupcake, M Street Northwest, Washington, DC, USA'},
          {title: 'Shenanigan’s Irish Pub, 18th Street Northwest, Washington, DC, USA'}
        ]
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
            <MapContainer 
              locations={this.state.locations}
            />
          </article>
          <aside className="aside list">Aside 1</aside>
        </div>
      </div>
    );
  }
}

export default App;
