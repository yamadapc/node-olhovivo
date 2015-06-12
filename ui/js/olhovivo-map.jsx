'use strict';
var React = require('react/addons');
var ReactGoogleMaps = require('react-google-maps');
var io = require('socket.io-client')('http://localhost:4000');

var GoogleMapsMixin = ReactGoogleMaps.GoogleMapsMixin;
var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;

var OlhoVivoMap = React.createClass({
  displayName: "OlhoVivoMap",
  mixins: [GoogleMapsMixin],

  render: function() {
    var center = new google.maps.LatLng(-23.5435343, -46.6179336);

    return (
      <div style={{height: "100%"}}>
        <Map ref="map" style={ { height: "100%", } } zoom={12} center={center} />
        <OlhoVivoHeatmap />
      </div>
    );
  }
});

var OlhoVivoHeatmap = React.createClass({
  getInitialState: function() {
    return { positions: [] };
  },

  componentDidMount: function() {
    var _this = this;
    var markers = [];

  },

  render: function() {
    return <div></div>
  },
});

exports = module.exports = OlhoVivoMap;
