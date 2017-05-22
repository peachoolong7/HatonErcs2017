function toggleProfileDropdown(){
  var dd = document.getElementById('dropdown-container');

  if(dd.classList.contains('hidden'))
    dd.classList.remove('hidden');
  else
    dd.classList.add('hidden');
}

function test(){
  var request = $.ajax({
    url: "./request_data.php?getData&suffix=OEM/4028834c5bf2e452015bf69d208e0008",
    method: "GET"
  });

  request.done(function( msg ) {
    console.log(msg);
  });
}

function getCar(vin){
  var suffix = 'autovehicle/v1/vehicles/'+vin;

  var request = $.ajax({
    url: "./request_data.php?getData&suffix="+suffix,
    data: { data : '',
            method : 'GET'},
    method: "POST"
  });

  request.done(function( msg ) {
    console.log(JSON.parse(msg));
  });
}

function fetchCar(){
  var suffix = 'autovehicle/v1/vehicles/.search';
  var data_ = '{"attributes":["VIN","VRN"],\
"count":50,\
"schemas":["urn:ietf:params:scim:api:messages:2.0:SearchRequest"],\
"sortBy":"VIN"}';

  var request = $.ajax({
    url: "./request_data.php?getData&suffix="+suffix,
    data: { data : data_,
            method : 'POST'},
    method: "POST"
  });

  request.done(function( msg ) {
    console.log(msg);
  });
}


var mymap = L.map('map-container',{
  center: L.latLng(-6.1939007,106.8215267),
  zoom: 17
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiYnJhbmRuZGF5IiwiYSI6ImNqMnl3ZGRlbzAwMjUyd3J4dDM2amExb3EifQ.I0hrewTHn193W40EUUJ3hQ'
}).addTo(mymap);

/* Get the live drivers */
setInterval(function(){

},500);
