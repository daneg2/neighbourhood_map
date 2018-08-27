import React, { Component } from 'react';
import GoogleMapContainer from './components/googleMap.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header">Header</header>
        <div className="body-container">
          <article className="map">
            <GoogleMapContainer />
          </article>
          <aside className="aside list">Aside 1</aside>
        </div>
      </div>
    );
  }
}

export default App;
