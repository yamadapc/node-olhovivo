'use strict';
var _ = require('lodash');
var io = require('socket.io-client')('localhost:4000');
var markers = [];

io.on('positions', function(positions) {
  markers.push(positions.map(function(position) {
    return new google.maps.LatLng(position.py, position.px);
  }));
});

var renderSite = document.getElementById('app');
var map = new google.maps.Map(renderSite, {
  center: new google.maps.LatLng(-23.5435343, -46.6179336),
  zoom: 12,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
});

// var heatmap;
setInterval(function() {
  console.log(_.flatten(markers).length);
  if(_.flatten(markers).length) {
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: _.flatten(markers),
    });
    heatmap.setMap(map);
  }
  markers = [];
}, 3000);

