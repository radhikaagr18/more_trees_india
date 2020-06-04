
var view = new ol.View({
  center: [0,0],
  zoom: 2
  });
var geolocation = new ol.Geolocation({
  // enableHighAccuracy must be set to true to have the heading value.
  trackingOptions: {
    enableHighAccuracy: true
  },
  projection: view.getProjection()
});
window.addEventListener('load', function() {
  geolocation.setTracking(true);
  // console.log(this.checked)
});

// update the HTML page when the position changes.


// handle geolocation error.
geolocation.on('error', function(error) {
  var info = document.createElement('div');
  info.innerHTML = error.message;
  info.style.display = '';
});

var accuracyFeature = new ol.Feature();
geolocation.on('change:accuracyGeometry', function() {
  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});



var vectorSource = new ol.source.Vector({});
var url="api/view_in_map/1"
var places =""
fetch(url)
  .then(function(data) {
    places=data;
    console.log(data);
    console.log(places)
    })  
//  [
// [97.4320373,25.3440388],[96.0057831,21.9405043],  
// [97.0337,20.7888],
// [96.0118912,16.9101877],
// [97.2906196,22.6239215],
// ];

var features = [];
for (var i = 0; i < places.length; i++) {
var iconFeature = new ol.Feature({
geometry: new ol.geom.Point(ol.proj.transform([places[i][0].longitude, places[i][1].latitude], 'EPSG:4326', 'EPSG:3857')),
});
var design='./../images/tree.png'

var iconStyle = new ol.style.Style({
image: new ol.style.Icon({
src: design,
color: places[i][3],
crossOrigin: 'anonymous',
})
});
iconFeature.setStyle(iconStyle);
vectorSource.addFeature(iconFeature);
}



var vectorLayer = new ol.layer.Vector({
source: vectorSource,
updateWhileAnimating: true,
updateWhileInteracting: true
});

var map = new ol.Map({
target: 'map',
view: view,
layers: [
new ol.layer.Tile({
preload: 3,
source: new ol.source.OSM(),
}),
vectorLayer,
],
loadTilesWhileAnimating: true,
});

var positionFeature = new ol.Feature();
positionFeature.setStyle(new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({
      color: '#3399CC'
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 2
    })
  })
}));

geolocation.on('change:position', function() {
  var coordinates = geolocation.getPosition();
  view.animate({
    center: coordinates,
    zoom:5,
    duration: 1000
  });
  // view.center=coordinates;
  // view.zoom=10;
  console.log(view)
  console.log(coordinates)
  positionFeature.setGeometry(coordinates ?
    new ol.geom.Point(coordinates) : null);
});
new ol.layer.Vector({
  map: map,
  source: new ol.source.Vector({
    features: [accuracyFeature, positionFeature]
  })
});