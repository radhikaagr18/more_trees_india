// var key = 'Your Mapbox access token from https://mapbox.com/ here';

/**
 * Elements that make up the popup.
 */
// var container = document.getElementById('popup');
// var content = document.getElementById('popup-content');
// var closer = document.getElementById('popup-closer');


/**
 * Create an overlay to anchor the popup to the map.
 */
// var overlay = new ol.Overlay({
//   element: container,
//   autoPan: true,
//   autoPanAnimation: {
//     duration: 250
//   }
// });


/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
// closer.onclick = function() {
//   overlay.setPosition(undefined);
//   closer.blur();
//   return false;
// };
var url="api/view_in_map/1"
function testAjax(handleData) {
  $.ajax({
    url:url,  
    success:function(data) {
      handleData(data); 
    }
  });
}
mapboxgl.accessToken = '<your access token here>';
var vectorSource = new ol.source.Vector({});

var features = [];
testAjax(function(output){
  // here you use the output

for(var i=0;i<output.length;i++){
var iconFeature = new ol.Feature({
geometry: new ol.geom.Point(ol.proj.transform([output[i].longitude,output[i].latitude], 'EPSG:4326', 'EPSG:3857')),
});
// console.log(places[i][0])
var design='./../images/tree.png'

var iconStyle = new ol.style.Style({
image: new ol.style.Icon({
src: design,
// color: design,
crossOrigin: 'anonymous',
})
});
iconFeature.setStyle(iconStyle);
vectorSource.addFeature(iconFeature);
}
});
// console.log(places)

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
vectorLayer
],
loadTilesWhileAnimating: true
// overlays:overlay
});
map.on('singleclick', function(evt) {
  var coordinate = evt.coordinate;
  var hdms = toStringHDMS(toLonLat(coordinate));

  content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
      '</code>';
  overlay.setPosition(coordinate);
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
  positionFeature.setGeometry(coordinates ?
    new ol.geom.Point(coordinates) : null);
});
new ol.layer.Vector({
  map: map,
  source: new ol.source.Vector({
    features: [accuracyFeature, positionFeature]
  })
});

