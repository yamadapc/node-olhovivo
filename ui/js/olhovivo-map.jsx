'use strict';
var React = require('react/addons');
var ReactGoogleMaps = require('react-google-maps');
var io = require('socket.io-client')('http://localhost:9000');

var GoogleMapsMixin = ReactGoogleMaps.GoogleMapsMixin;
var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;

var OlhoVivoMap = React.createClass({
  displayName: "OlhoVivoMap",
  mixins: [GoogleMapsMixin],

  getInitialState: function() {
    return { markers: [] };
  },

  componentDidMount: function() {
    var _this = this;
    io.on('positions', function(positions) {
      var markers = positions.map(function(position) {
        return {
          position: {
            lat: position.py,
            lng: position.px,
          },
          key: position.p,
        }
      });
      console.log(positions);
      console.log(markers);

      _this.setState({ markers: markers, });
    });
  },

        // <ToastContainer ref="toast" toastMessageFactory={React.createFactory(ToastMessage.jQuery)}/>
  render: function() {
    var center = new google.maps.LatLng(-23.5435343, -46.6179336);

    return (
      <div style={{height: "100%"}}>
        <Map ref="map" style={ { height: "100%", } } zoom={12} center={center} />
        {this.state.markers.map(toMarker, this)}
      </div>
    );

    function toMarker(marker, index) {
      return <Marker position={marker.position} key={marker.key} />;
    }
  }
});

exports = module.exports = OlhoVivoMap;