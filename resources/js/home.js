import 'ol/ol.css';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import {toStringHDMS} from 'ol/coordinate';
import {fromLonLat, toLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import {Icon, Style} from 'ol/style';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { transform } from 'ol/proj';
import Vector from 'ol/source';
import VectorSource from 'ol/source/Vector';
// import {Tile, Vector as VectorLayer} from 'ol/layer';


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
  element: document.getElementById('popup'),
  positioning: 'center',
  stopEvent: false,
//   offset: [0, -50]
});
map.addOverlay(popup);

map.on('click', function(evt) {
  var element = popup.getElement();
  var coordinate = evt.coordinate;
//   var hdms = toStringHDMS(toLonLat(coordinate));
  var feature = map.forEachFeatureAtPixel(evt.pixel,
    function(feature) {
      return feature;
    });
    if (feature) {
        console.log(feature.get('name'))
        var coordinates = feature.getGeometry().getCoordinates();
        console.log(coordinate)
        $(element).popover('dispose');
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
// map.on('pointermove', function(evt) {
//     map.getTargetElement().style.cursor =
//         map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
//   });
  map.on('pointermove', function(e){
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getViewport().style.cursor = hit ? 'pointer' : '';
  });