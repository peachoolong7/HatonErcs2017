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

function toggleProfileDropdown(){
  var dd = document.getElementById('dropdown-container');

  if(dd.classList.contains('hidden'))
    dd.classList.remove('hidden');
  else
    dd.classList.add('hidden');
}

var car_vim_list = [];
var marker = [];

/* Get the live drivers */
setTimeout(function(){
  setInterval(function(){
    for(var i = 0; i < marker.length; i++){
      mymap.removeLayer(marker[i]);
    }

    for(var i = 0; i < car_vim_list.length; i++){
      fetchCarTelematics(car_vim_list[i], 'Basic', function(car_data, vin){
        console.log("Got data");
        if(car_data != '[]' && car_data != ''){
          var info = JSON.parse(car_data);
          if(info[0] && typeof info[0] != undefined){
            // info = Object.keys(info[0].VehicleSpecification.Basic.position);
            Object.getOwnPropertyNames(info[0].VehicleSpecification.Basic.position).forEach(
              function (val, idx, array) {
                info = info[0].VehicleSpecification.Basic.position[val];

                var blip = null;

                for(var i = 0; i < marker.length; i++){
                  if(marker[i].vin == vin){
                    blip = marker[i].blip;
                    break;
                  }
                }

                blip.setLatLng([info.latitude, info.longitude]);
                // var blip = L.marker([info.latitude, info.longitude]);
              }
            );
          }
        }
      });
    }
    console.log("Update...");
  },5000);
}, 10000);

getCarList(function(data){
  // console.log(data.data.list);
  // return;
  for(var i = 0; i < data.data.list.length; i++){
    car_vim_list.push(data.data.list[i].VIN);
    fetchCarTelematics(data.data.list[i].VIN, 'Basic', function(car_data, vin){
      // console.log(car_data);
      if(car_data != '[]' && car_data != ''){
        var info = JSON.parse(car_data);
        if(info[0] && typeof info[0] != undefined){
          // info = Object.keys(info[0].VehicleSpecification.Basic.position);
          Object.getOwnPropertyNames(info[0].VehicleSpecification.Basic.position).forEach(
            function (val, idx, array) {
              console.log(info[0].VehicleSpecification.Basic);
              info = info[0].VehicleSpecification.Basic.position[val];
              var blip = L.marker([info.latitude, info.longitude]);
              // console.log(info.latitude, info.longitude);
              // blip.setLatLng([51.5+(Math.floor((Math.random() * 100) + 1)/100), -0.09+(Math.floor((Math.random() * 100) + 1)/100)]);
              blip.addTo(mymap);
              marker.push({'vin':vin, 'blip':blip});
            }
          );
        }
      }
    });
  }

  // console.log(data.Resources.length);
});

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
  var acc_enc_ = '*/*';

  var request = $.ajax({
    url: "./request_data.php?getData&suffix="+suffix,
    data: { data : '',
            method : 'GET',
            acc_enc: acc_enc_},
    method: "POST"
  });

  request.done(function( msg ) {
    console.log(JSON.parse(msg));
  });
}

function getCarList(callback){
  var suffix = 'fms-core/OEM/4028834c5bf2e452015bf69d208e0008/Vehicles';
  var data_ = '{\
   "pageSize": "",\
   "pageIndex": ""}';
  var acc_enc_ = '*/*';

  var request = $.ajax({
    url: "./request_data.php?getData&suffix="+suffix,
    data: { data : data_,
            method : 'POST',
            acc_enc: acc_enc_},
    method: "POST"
  });

  request.done(function( msg ) {
    // console.log(msg);
    // return;
    if(typeof callback == 'function')
    callback(JSON.parse(msg));
  });
}

function fetchCarTelematics(vin, sensorSpec, callback){
  var suffix = 'm2m/trusted/data?dgg='+ vin + '&sensorSpec=' + sensorSpec + '&latestNCount=1';
  var acc_enc_ = 'application/vnd.ericsson.simple.output.fmsdev+json;version=1.0';

  var request = $.ajax({
    url: "./request_data.php?getData&suffix="+encodeURIComponent(suffix),
    data: { data : '',
            method : 'GET',
            acc_enc: acc_enc_},
    method: "POST"
  });

  request.done(function( msg ) {
    if(typeof callback == 'function')
    callback(msg, vin);
    // callback(JSON.parse(msg));

  });
}
