'use strict';
var React = require('react/addons');
var OlhoVivoMap = require('./olhovivo-map');

var renderSite = document.getElementById('app');
React.render(<OlhoVivoMap googleMapsApi={google.maps} />, renderSite);
