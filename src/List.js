/*global google*/
import React from 'react'
import './App.css'
import escapeRegExp from 'escape-string-regexp';


/**
 * @class List
 * @classdesc Renders a list view of destinations
 */
class List extends React.Component {
    state = {
        query: '',
        markers: this.props.markers,
    };

    /**
     * @description Handles click event, opens infowindow on clicked destination
     * @param event - click event from list
     */
    openInfo(event) {
        let marker;
        this.props.markers.map(currMarker =>{
            if(event.target.id === currMarker.title){
                marker = currMarker;
            }
        });
        this.props.infoWindows.map(infoWin =>{
            if(event.target.id === infoWin.marker.title){
                marker.setAnimation(google.maps.Animation.BOUNCE);
                infoWin.open(this.props.map,marker);
                infoWin.addListener('closeclick',function(){
                        marker.setAnimation(null);
                    });
            }
        })
    }

    /**
     * @description Render method
     */
    render() {

        let showingNames;
        if (this.props.query) {
            const match = new RegExp(escapeRegExp(this.props.query), 'i');
            showingNames = this.props.markers.filter((marker) => match.test(marker.title));
        } else {
            showingNames = this.props.markers;
        }

        return <ul aria-label="List of places">
                {
                    showingNames.map((marker, index) =>
                       <li key={marker.title}><a href="#" id={marker.title} onClick={this.openInfo.bind(this)} role="Listitem">{marker.title}</a></li>
                    )
                }
        </ul>
    }
}

export default List
