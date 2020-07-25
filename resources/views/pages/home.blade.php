
  <head>
    <title>Geolocation</title>
    <!-- The line below is only needed for old environments like Internet Explorer and Android 4.x -->
    <!-- <script type="module" src="{{url('js/ol.js')}}"></script> -->
    
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,requestAnimationFrame,Element.prototype.classList,URL"></script>
    <script src="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.js"></script>
    <link href="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css" rel="stylesheet" />
    <!-- <link rel="stylesheet" href="../css/ol.css" type="text/css"> -->
    <style type="text/css">
      html, body, .map {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }
      /* ul{
        visibility:hidden;
      } */
    </style>
  </head>
  @include('layouts.navbar')
  <body>
 
  <div id="map" class="map"></div>
    <div style="display: none;">
      <!-- Clickable label for Vienna -->
      <a class="overlay" id="vienna" target="_blank" href="http://en.wikipedia.org/wiki/Vienna">Vienna</a>
      <div id="marker" title="Marker"></div>
      <!-- Popup -->
      <div id="popup" title="Welcome to OpenLayers"></div>
    </div>
    <script type="module" src="{{mix('/js/app.js')}}"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  </body>
