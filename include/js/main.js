
var namaPolisix = "Hack Police";
var telpPolisix = "0812348234";

var mymap = L.map('map-container',{
  center: L.latLng(-6.1939007,106.8215267),
  zoom: 17
});
var car_vim_list = [];
var marker = [];
var data_count = 0;
var data_loop_count = 0;

var carIcon = L.icon({
    iconUrl: 'include/img/798.png',

    iconSize:     [20, 44.736842106], // size of the icon
    iconAnchor:   [10, 22.368421053], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


  $(".modalBackground").css("display","none");


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

/* Get the live drivers */
setTimeout(function(){
  setInterval(function(){
    for(var i = 0; i < marker.length; i++){
      mymap.removeLayer(marker[i]);
    }

    outer_loop:
    for(var i = 0; i < car_vim_list.length; i++){
      if(i % 2 == data_loop_count)
      continue outer_loop;

      fetchCarTelematics(car_vim_list[i], 'Basic', function(car_data, vin){
        if(car_data != '[]' && car_data != ''){
          var info = JSON.parse(car_data);
          if(info[0] && typeof info[0] != undefined){
            Object.getOwnPropertyNames(info[0].VehicleSpecification.Basic.position).forEach(
              function (val, idx, array) {
                info = info[0].VehicleSpecification.Basic.position[val];

                var blip = null;

                for(var i = 0; i < marker.length; i++){
                  if(marker[i].vin == vin){
                    blip = marker[i];
                    break;
                  }
                }

                blip = marker[i].blip;

                blip.setLatLng([info.latitude, info.longitude], {rotationAngle: info.heading});
              }
            );
          }
        }
      });
    }

    data_loop_count = Math.abs(data_loop_count - 1);
    console.log("Update... ");
  },5000);

  setInterval(function(){
    event_loop:
    for(var i = 0; i < car_vim_list.length; i++){
      if(i % 2 == data_loop_count)
      continue event_loop;

      getEvents(car_vim_list[i],function(data){
        // tmp = data[0].VehicleSpecification.Event.tag;
        var tmp = data[0].VehicleSpecification.Event.tag;
        console.log(tmp[Object.getOwnPropertyNames(tmp)[0]]);
      });
    }
  },2500);
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
              // console.log(info[0].VehicleSpecification.Basic);
              info = info[0].VehicleSpecification.Basic.position[val];
              var blip = L.marker([info.latitude, info.longitude], {icon: carIcon, rotationAngle: info.heading});
              blip.addTo(mymap);
              marker.push({'vin':vin, 'blip':blip, 'data_count': data_count});
              data_count++;
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

function getEvents(vin, callback){
  var suffix = 'm2m/trusted/data?dgg='+ vin +'&sensorSpec=Event&latestNCount=1';
  var acc_enc_ = 'application/vnd.ericsson.simple.output.fmsdev+json;version=1.0';

  var request = $.ajax({
    url: "./request_data.php?getData&suffix="+encodeURIComponent(suffix),
    data: { data : '',
            method : 'GET',
            acc_enc: acc_enc_},
    method: "POST"
  });

  request.done(function( msg ) {
    // console.log(msg);
    // return;
    if(typeof callback == 'function')
    var obj = null;
    try {
      obj = JSON.parse(msg);
    } catch (e) {
      return;
    }
    callback(obj);
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

function kirimPeringatan(driverid=0, nama, denda,dendamsg,telpPolisi,namaPolisi){
var de = new Date();
var month = de.getMonth()+1;
var day = de.getDate();
var hour = de.getHours();
var minute = de.getMinutes();
var datestring = de.getFullYear() + '/' +
    ((''+month).length<2 ? '0' : '') + month + '/' +
    ((''+day).length<2 ? '0' : '') + day + " " +hour+ ":" + minute ;




var bundel={
  namaDriver:nama,
  idDriver:driverid,
  dendaDriver:denda,
  dendaMessage:dendamsg,
  telpPolisi:telpPolisi,
  polisiNama:namaPolisi,
  time:datestring,
  status:'A'};

firebase.database().ref('/drivers/'+bundel.idDriver ).push(bundel);
};

$("#modal1Cancel").click(function(){
  $(".modalBackground").css("display","none");
});
$("#modal1Warning").click(function(){

    var namaD = $("#mtbContactName").html();
      var driverID = $("#mtbVhclID").html();
  var dendaType = $("#inputDendaType").val();
  var dendaMsg = $("#inputDenda").val();
  driverID ="2";
  kirimPeringatan(driverID,namaD, dendaType,dendaMsg,telpPolisix, namaPolisix);
    $(".modalBackground").css("display","none");

});
function appendCarList(xAddress,xContact,xPhone,XEmail,xLocation,xCarType,xCarYear,xCarID,xCarSpeed){

  var tes=`
    <li dataf-valueAddress="${xAddress}"
    dataf-valueContact="${xContact}"
    dataf-valuePhone="${xPhone}"
    dataf-valueEmail="${XEmail}"
    dataf-valueLocation="${xLocation}"
    dataf-valueCarType="${xCarType}"
    dataf-valueCarYear="${xCarYear}"
    dataf-valueCarID="${xCarID}">
      <span class="listDriverName">${xCarID}</span><br>
      <span><span class="listDriverSpeed">${xCarSpeed}</span> KM/S</span> - <span>${xCarType}</span>
    </li>`;
    $("#ListCar").append(tes);

    $("#ListCar li").last().click(function(){
        var carAddress= $(this).attr("dataf-valueAddress");
      var carContact= $(this).attr("dataf-valueContact");
      var carPhone= $(this).attr("dataf-valuePhone");
      var carEmail= $(this).attr("dataf-valueEmail");
      var carLocation= $(this).attr("dataf-valueLocation");
      var carType= $(this).attr("dataf-valueCarType");
      var carYear= $(this).attr("dataf-valueCarYear");
      var carID= $(this).attr("dataf-valueCarID");
      console.log(carType);

      $("#mtbAddress").html(carAddress);
      $("#mtbContactName").html(carContact);
      $("#mtbPhone").html(carPhone);
      $("#mtbEmail").html(carEmail);
      $("#mtbLocation").html(carLocation);
      $("#mtbCarType").html(carType);
      $("#mtbVhclID").html(carID);

      $(".modalBackground").css("display","block");


    });


}


function appendOccurence(xEventType,xLatLong){

  var tes=`
    <li>
      <span class="listDriverName">${xEventType}</span><br>
      <span><span class="listLatLong">${xLatLong}</span></span>
    </li>`;
    $("#ListOccurence").append(tes);


}
function appendDriver(xDriverName,xCarID,xCarType){

  var tes=`
  <li>
    <span class="listDriverName">${xDriverName}</span><br>
    <span>${xCarID}</span> - <span>${xCarType}</span>
  </li>`;
    $("#ListDriver").append(tes);


}
appendOccurence("Accident","1000,100");
appendDriver("xDriverName","xCarID","xCarType");

 appendCarList("xAddress","xContact","xPhone","XEmail","xLocation","xCarType","xCarYear","xCarID","1000");
