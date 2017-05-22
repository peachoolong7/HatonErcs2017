<html>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
  <head>
    <title></title>

    <link rel="stylesheet" type="text/css" href="include/css/bp.css" />
    <link rel="stylesheet" type="text/css" href="include/css/style.css" />
    <link rel="stylesheet" href="include/leaflet/leaflet.css" />
    <link rel="stylesheet" href="include/css/popup.css" />

    <script src='https://api.mapbox.com/mapbox-gl-js/v0.36.0/mapbox-gl.js'></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v0.36.0/mapbox-gl.css' rel='stylesheet' />
  </head>

  <body>


    <div class="modalBackground">
      <div class="modalPopup">
        <div class="textData">
          <span class="idAsTitle" id ="mtbVhclID">Idnya</span> <br><br>
          Address : <span id="mtbAddress" class="pullRight">Idnya</span><br>
          Contact name : <span id="mtbContactName" class="pullRight">Idnya</span>  <br>
          Phone : <span id="mtbPhone" class="pullRight">Idnya</span> <br>
          Email : <span id="mtbEmail" class="pullRight">Idnya</span> <br><br>
          Location : <span id="mtbLocation" class="pullRight">Idnya</span> <br>

          Car type : <span id="mtbCarType" class="pullRight">Idnya</span> <br>
          Car Year : <span id="mtbYear" class="pullRight">Idnya</span> <br>
          <br>


        </div>
        <div class="modalInputGroup">
          <select class="textBoxDenda" id="inputDendaType">
            <option val="Warning">Peringatan</option>
            <option val="DendaRingan">Denda Ringan</option>
            <option val="DendaKecil">Denda Kecil</option>
            <option val="DendaMenengah">Denda Menengah</option>
            <option val="DendaBerat">Denda Berat</option>
          </select>
          <input type="text" class="textBoxDenda"id="inputDenda" placeholder ="Pesan kepada Pengemudi"/>
        </div>
        <div class="buttonGroup">
          <button class="normal" id="modal1Cancel">Cancel</button>
          <button class="joy" id="modal1Warning">Warning</button>
        </div>
      </div>
    </div>
    <header>
      <span class="siteHeaderTitle"><IMG SRC="include/img/TESICON.png" width ="40px" style="float : left; margin-right : 4px;"><span class="extraBold">GRIFFY</span><i>TRAFFICPOLICE</i></span>
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
    <div class="section-content wrapperFlex" style="">
      <div class="DriverBox"><br>
          <span class="tabTitle" >Driver List</span><br>
          <ul class="listDriver" id ="ListDriver">
          </ul>
      </div>
      <div class="carBox"><br>
          <span class="tabTitle">Car List</span><br>
          <ul class="listDriver" id ="ListCar">
          </ul>
      </div>
      <div class="carBox"><br>
          <span class="tabTitle">Occurence</span><br>
          <ul class="listDriver"id ="ListOccurence">

          </ul>
      </div>
    </div>


  </body>

  <script src="include/js/jquery-3.2.1.min.js"></script>
  <script src="include/js/popup.js"></script>
  <script>

    $('a.tralala').popup();
    var options = { type : 'image' };
    $('a.tralala').popup(options);


  </script>

  <script src="https://www.gstatic.com/firebasejs/4.0.0/firebase.js"></script>
  <script>
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyC1LTtAeNEYgj6koBWzO36xQP6WX1XMLB8",
      authDomain: "hte2017-34fdb.firebaseapp.com",
      databaseURL: "https://hte2017-34fdb.firebaseio.com",
      projectId: "hte2017-34fdb",
      storageBucket: "hte2017-34fdb.appspot.com",
      messagingSenderId: "306483388158"
    };
    firebase.initializeApp(config);
  </script>
  <script src="include/leaflet/leaflet.js"></script>
  <script src="include/js/Leaflet.transformmarker.js"></script>
  <script src="include/js/main.js"></script>
</html>
