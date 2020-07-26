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
import { Feature } from 'ol/Feature';
import Point from 'ol/geom/Point';
import { transform } from 'ol/proj';
import Vector from 'ol/source';
import VectorSource from 'ol/source/Vector';
// import {Tile, Vector as VectorLayer} from 'ol/layer';


var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

console.log(trees)
var vectorSource= new VectorSource;
for(var i=0;i<trees.length;i++){
    var iconFeature=new Feature({
        geometry:new Point(transform([trees[i].longitude,trees[i].latitude],'EPSG:4326', 'EPSG:3857')),
        name:trees[i].name,
        species:trees[i].species,
        diameter:trees[i].diameter
    });
    console.log(iconFeature.get('name'))
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

var treeslayer=new VectorLayer({
    source:vectorSource
})
var layer = new TileLayer({
  source: new OSM()
});

var map = new Map({
  layers: [layer,treeslayer],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

// Popup showing the position the user clicked
var popup = new Overlay({
  element: document.getElementById('popup')
});
map.addOverlay(popup);

// display popup on click
map.on('click', function(evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel,
    function(feature) {
      console.log(feature.get('name'))
      return feature;
    });
  if (feature) {
    var coordinates = feature.getGeometry().getCoordinates();
    popup.setPosition(coordinates);
    $(element).popover({
      placement: 'top',
      html: true,
      content: feature.get('name')
    });
    $(element).popover('show');
  } else {
    $(element).popover('dispose');
  }
});

// change mouse cursor when over marker
map.on('pointermove', function(e) {
  if (e.dragging) {
    $(element).popover('destroy');
    return;
  }
  var pixel = map.getEventPixel(e.originalEvent);
  var hit = map.hasFeatureAtPixel(pixel);
  map.getTarget().style.cursor = hit ? 'pointer' : '';
});