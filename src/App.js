import React, { Component } from 'react';
import './App.css';
import Map from './Map'

class App extends Component {
    render() {
        return (
            // eslint-disable-next-line
            <div className="App" role="application">
                <Map/>
            </div>
        );
    }
}
export default App;