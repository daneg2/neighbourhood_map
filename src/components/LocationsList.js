import React, { Component } from 'react'
import './LocationsList.css'

class LocationsList extends Component {  
    constructor(props) {
        super(props);
        this.list = React.createRef();
    }
    //Set reference when component mounts
    componentDidMount() {
        this.props.getRef(this.list)
    }

    render () {
        return (
            <aside className="list-container" role="navigation">
                <div className="heading">
                    <h2>Daytripper in DC</h2>
                    <p>All the must-see locations in Washington, DC for when you don't have a lot of time.</p>
                    <p>All the information comes from the Foursquare API.</p>
                </div>
                {/* If no locations in array, display 'No Response' message */}
                {this.props.arrayLength <= 0 && <p className="response">Oops! Seems like we couldn't find your location - try again!</p>}
                <ul className="list" ref={this.list} tabIndex={-1}>
                    {/* Map through lits of filtered array to list locations */}
                    {this.props.markersArray.map((location, index) => {
                        return (        
                            <li 
                                //Read info from infoWindow when land on list item
                                aria-label={`${location.shortTitle} Description:${location.description} Opening Hours:${location.openHours} Rating:${location.rating} Contact Number:${location.contactNumber}`}
                                tabIndex={this.props.activeMenu ? 0 : -1} 
                                key={location.title} 
                                onClick={() => {
                                    this.props.clickHandler(index)
                                    this.props.clickToggle(index)
                                }}
                                //Display infowindows on enter
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