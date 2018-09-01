import React from 'react'
import './App.css'
import escapeRegExp from 'escape-string-regexp';
import List from "./List";

/**
 * @class Search
 * @classdesc Logic for searching through given places
 */
class Search extends React.Component {
    state = {
        query: '',
    };

    /**
     * @description Updates query as user changes it
     * @param event - onChange event
     */
    updateQuery = (event) => {
        this.setState({query: event.target.value});
    };

    /**
     * @description Renders input field and search results on a search page and list view.
     */
    render() {
        let showingMarkers;
        let notShowingMarkers;
        if(this.state.query){
            const match = new RegExp(escapeRegExp(this.state.query),'i');
            notShowingMarkers = this.props.markers.filter((marker) => !match.test(marker.title));
            showingMarkers = this.props.markers.filter((marker) => match.test(marker.title));
            showingMarkers.map(marker => marker.setVisible(true));
            notShowingMarkers.map(marker => marker.setVisible(false));
        } else {
            showingMarkers = this.props.markers;
            showingMarkers.map(marker => marker.setVisible(true));
        }

        // eslint-disable-next-line
       return <div role="Search">
            <input type="text" onChange={this.updateQuery.bind(this)} placeholder="Search places" value={this.state.query} aria-label="Search input field"/>
           {//console.log(this.props.markers)
                }
           <List query={this.state.query} markers={this.props.markers} infoWindows={this.props.infoWindows} map={this.props.map}/>
        </div>
    }
}

export default Search
