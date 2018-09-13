import React, { Component } from 'react'
import './LocationsList.css'

class LocationsList extends Component {  
    constructor(props) {
        super(props);
        this.list = React.createRef();
    }

    componentDidMount() {
        this.props.getRef(this.list)
    }

    render () {
        return (
            <aside className="list-container" role="navigation">
                <div className="heading">
                    <h2>Stripper in DC</h2>
                    <p>All the must-see locations in Washington, DC for when you don't have a lot of time.</p>
                </div>
                {this.props.arrayLength <= 0 && <p className="response">Oops! Seems like we couldn't find your location - try again!</p>}
                <ul className="list" ref={this.list} tabIndex={-1}>
                    {this.props.markersArray.map((location, index) => {
                        return (        
                            <li 
                                aria-label={location.title} 
                                tabIndex={this.props.activeMenu ? 0 : -1} 
                                key={location.title} 
                                onClick={() => {
                                    this.props.clickHandler(index)
                                    this.props.clickToggle(index)
                                }}
                                onKeyPress={(event) => {
                                    let code = event.keyCode || event.which;
                                    if(code === 13) { 
                                        this.props.clickHandler(index)
                                        this.props.clickToggle(index)
                                    } 
                                }}
                            >        
                                {location.shortTitle}
                            </li>  
                        )
                    })}
                </ul>
            </aside>
        )
    }
}

export default LocationsList