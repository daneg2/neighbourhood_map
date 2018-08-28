import React, { Component } from 'react';
import GoogleMapContainer from './components/GoogleMap.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        active: true,
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
              <img src={require('./images/menu.svg')} alt="Open Menu"/>
            </div>
            <GoogleMapContainer />
          </article>
          <aside className="aside list">Aside 1</aside>
        </div>
      </div>
    );
  }
}

export default App;
