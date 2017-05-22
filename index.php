<html>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
  <head>
    <title></title>

    <link rel="stylesheet" type="text/css" href="include/css/bp.css" />
    <link rel="stylesheet" type="text/css" href="include/css/style.css" />
    <link rel="stylesheet" href="include/leaflet/leaflet.css" />

    <script src='https://api.mapbox.com/mapbox-gl-js/v0.36.0/mapbox-gl.js'></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v0.36.0/mapbox-gl.css' rel='stylesheet' />
  </head>

  <body>
    <header>
      <ul class="section-content">
        <li><button disabled="" class="no-endcap-right">Marvin Crist</button><button class="no-endcap-left" onclick="toggleProfileDropdown()"><span id="dropdown-arrow">&#8227;</span></button></li>
      </ul>
      <div id="dropdown-container" class="hidden">
        <div id="dropdown-profile"></div>

        <div id="dropdown-description">
          <ul>
            <li><b>Marvin Crist</b></li>
            <li>+62 812 5551212</li>
          </ul>
        </div>

        <button class="danger no-endcap-top">Logout</button>
      </div>
    </header>

    <div id="map-container">

    </div>
  </body>

  <script src="include/js/jquery-3.2.1.min.js"></script>
  <script src="include/leaflet/leaflet.js"></script>
  <script src="include/js/Leaflet.transformmarker.js"></script>
  <script src="include/js/main.js"></script>
</html>
