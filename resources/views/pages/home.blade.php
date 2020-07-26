
  <head>
    <title>Geolocation</title>
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,requestAnimationFrame,Element.prototype.classList,URL"></script>
    <script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <script>
    var trees = {!! $trees->toJson() !!};
    </script>
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
  <div id="map" class="map"><div id="popup"></div></div>
  <script type="module" src="{{mix('/js/app.js')}}"></script>
  </body>
   
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
  
