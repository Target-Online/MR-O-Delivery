import "./index.css";

import React, { Component } from "react";

import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

import appsettings from "appsettings.json";

export class MapContainer extends Component {
  render() {
    return (
      <Map
        className="maps"
        // eslint-disable-next-line react/prop-types
        google={this.props.google}
        zoom={16}
        initialCenter={{ lat: 6.1835345, lng: 6.7263677 }}
      >
        <Marker
          title={"Mr O Delivery"}
          position={{ lat: 6.1835345, lng: 6.7263677 }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: appsettings[appsettings.environment].firebaseConfig.apiKey,
})(MapContainer);
