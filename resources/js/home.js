import 'ol/ol.css';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import {toStringHDMS} from 'ol/coordinate';
import {fromLonLat, toLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import {Tile,Vector} from 'ol/layer';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import {Icon, Style} from 'ol/style';
import { Feature, Geolocation } from 'ol';
import Point from 'ol/geom/Point';
import { transform } from 'ol/proj';
// import Vector from 'ol/source';
import VectorSource from 'ol/source/Vector';
import {easeIn, easeOut} from 'ol/easing';
// import {Tile, Vector as VectorLayer} from 'ol/layer';
var current_location
var view=new View({
  center: [0, 0],
  zoom: 2
})
var geolocation = new Geolocation({
  // enableHighAccuracy must be set to true to have the heading value.
  trackingOptions: {
    enableHighAccuracy: true,
  },
  projection: view.getProjection(),
});
window.onload = (event) => {
  geolocation.setTracking(true);
  console.log('page is fully loaded');
  
};
/**
 * Create an overlay to anchor the popup to the map.
 */
var popup = new Overlay({
  element: document.getElementById('popup'),
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});
console.log(trees)
var vectorSource= new VectorSource();
for(var i=0;i<trees.length;i++){
    var iconFeature=new Feature({
        geometry:new Point(transform([trees[i].longitude,trees[i].latitude],'EPSG:4326', 'EPSG:3857')),
        name:trees[i].name,
        species:trees[i].species,
        created_at:trees[i].created_at.slice(0,10),
        diameter:trees[i].diameter
    });
    console.log(iconFeature.get('created_at'))
    var design='./../images/tree.png'
    var iconStyle=new Style({
        image:new Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src:design,
            // crossOrigin:'anonymous',
        })
    });
    iconFeature.setStyle(iconStyle);
    vectorSource.addFeature(iconFeature);
}

// var treeslayer=new Vector({
//     source:vectorSource
// })
var layer = new TileLayer({
  source: new OSM()
});
var map = new Map({
  target: 'map',
  layers: [layer ],
  view: view,
});
new VectorLayer({
  map: map,
  source: vectorSource,
});


var element = popup.getElement();
// display popup on hover
map.on('pointermove', function(event) {
  var feature = map.getFeaturesAtPixel(event.pixel)[0];
  if (feature) {
  var coordinate = event.coordinate;
  var hdms = toStringHDMS(toLonLat(coordinate));
  event.stopPropagation();
  $(element).popover('dispose');
  popup.setPosition(coordinate);
  $(element).popover({
    placement: 'top',
    animation: false,
    html: true,
    title: feature.get('species')+'<a class="close" href="#");">&times;</a>',
    content:   '<p>Location: '+hdms+'</p><p>Created at: '+feature.get('created_at')
  });
  $(element).popover('show');
  }
  else{
    $(element).popover('hide');
  }
});

map.on('pointermove', function(event) {
  if (map.hasFeatureAtPixel(event.pixel)) {
    map.getViewport().style.cursor = 'pointer';
  } else {
    map.getViewport().style.cursor = 'inherit';
  }
});

$(document).click(function (e) {
  if($(e.target).is('.close'))$(element).popover('hide');
});

var positionFeature = new Feature({
  geometry:new Point([current_location]),
  species:'Current Location',
  created_at:'You are here right now.'
});

var current_location_style=new Style({
  image:new Icon({
      anchor: [0.5, 0.5],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src:'./../images/currentlocation.png',
      // crossOrigin:'anonymous',
  })
})
positionFeature.setStyle(
  current_location_style
  );
  vectorSource.addFeature(positionFeature)

geolocation.on('change:position', function () {
  current_location = geolocation.getPosition();
  positionFeature.setGeometry(current_location ? new Point(current_location) : null);
  view.animate({
    center: current_location,
    duration: 3000,
    zoom:6
  });
  
});

new VectorLayer({
  map: map,
  source: new VectorSource({
    features: [ positionFeature],
  }),
});
//  $(document).click(function (e) {	var positionFeature = new ol.Feature();
//   if (($('.popover').has(e.target).length == 0) || $(e.target).is('.close')) {	positionFeature.setStyle(new ol.style.Style({
//       $('#popoverId').popover('hide');
//   }
map.addOverlay(popup);


