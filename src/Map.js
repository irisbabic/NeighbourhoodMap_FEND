/*global google*/
import React, {Component} from 'react';
import Search from './Search';
import './App.css'

let locations = require('./locations');
/* eslint-disable no-undef */

/**
 * @class Map
 * @classdesc Class for defining and rendering a map
 */
class Map extends Component {
state = {
    markers: [],
    infoWindows: [],
    map,
};
    errorArr = [];
    /**
     * @description Functions for filling infoWinfow with destination description
     * @param marker - marker to describe
     * @param infowindow - infowindow object
     * @param location - location to describe
     */
    populateInfoWindow(marker, infowindow, location) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker !== marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '<br>' + location.label+ '<br>' + location.county+ '<br>' + location.district+ '<br>' + location.country+ '<br>' + marker.position + '</div>');
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick',function(){
                infowindow.setMarker = null;
            });
        }
    }

    /**
     * @description Initiating map
     */
    initMap() {

            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 45.291365, lng: 14.2685039},
                zoom: 11,
                mapTypeControl: false
            });

        setTimeout(function () {
            window.gm_authFailure = function gm_authFailure(){alert('There was a problem with authentication')};
        },500);

        this.setState({map: map});
        let bounds;
        let markersObject = [];
        let infoWindows = [];
        for (let location of locations) {

            fetch(`https://geocoder.api.here.com/6.2/geocode.json?app_id=32jh9NsjhShfRgz5bHu8&app_code=ZXLwdj55q46lMDUA-dru4g&searchtext=${location.housenumber}%20${location.street}%20${location.city}%20${location.country}`)
                .then(response => response.json())
                // eslint-disable-next-line
                .then(data =>{
                    let info = data.Response.View[0].Result[0].Location.Address;
                    location.label = info.Label;
                    location.country = info.Country;
                    location.county = info.County;
                    location.district = info.District;

                    const marker = new google.maps.Marker({
                        position: location.location,
                        title: location.title,
                        animation: google.maps.Animation.DROP,
                        id: location.id,
                    });

                    bounds = new google.maps.LatLngBounds();

                    for (let i = 0; i < markersObject.length; i++) {
                        markersObject[i].setMap(map);
                        // Extend the boundaries of the map for each marker and display the marker
                        bounds.extend(markersObject[i].position);
                    }
                    map.fitBounds(bounds);
                    markersObject.push(marker);
                    this.setState({markers: markersObject});
                    let infoWindow = new google.maps.InfoWindow();
                    this.populateInfoWindow(marker,infoWindow,location);
                    infoWindows.push(infoWindow);
                    this.setState({infoWindows: infoWindows});

                    for (var i = 0; i < markersObject.length; i++) {
                        markersObject[i].setMap(map);
                        // Extend the boundaries of the map for each marker and display the marker
                        bounds.extend(markersObject[i].position);
                    }
                    map.fitBounds(bounds);

                    marker.addListener('click', function () {
                        infoWindow.open(map, marker);
                    });

                })
                .catch(error => {
                        this.handleError(error);
                        console.log(error);
                });

        }

    }
    /**
     * @description Handles error when HERE API fails to load resources
     */
    handleError(error){
        this.errorArr.push(error);
        if(this.errorArr.length === this.locations.length){
         for(error in this.errorArr){
            if(error){
                alert('There was an error while fetching data from HERE API');
                break;
            }
         }
        }

    }
    /**
     * @description Initialize map when component mounts
     */
    componentDidMount() {
        this.initMap();
    }

    /**
     * @description Open search
     */
    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    /**
     * @description Close search
     */
    closeNav() {
        document.getElementById("mySidenav").style.width = "0px";
    }

    /**
     * @description Render method
     */
    render() {
        return(
            // eslint-disable-next-line
            <div role="Search" className="w3-display-container w3-display-topleft">
                <span tabIndex="0" aria-label="Open search button" id="menu" onClick={this.openNav}>&#9776;</span>
                <div id="mySidenav" className="sidenav" aria-label="Search panel">
                    <a href="#" aria-label="Close search" className="closebtn" onClick={this.closeNav}>&times;</a>
                    <Search map={this.state.map} markers={this.state.markers} infoWindows={this.state.infoWindows} locations={this.locations} infoWindow={this.populateInfoWindow}/>
                </div>
            </div>
        );
    }
}

export default Map;
