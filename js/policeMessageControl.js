var namaPolisix = "Hack Police";
var telpPolisix = "0812348234";
var idKhususSementara = "2";

$("#btnSubmitDenda").click(function(){
  var namaD = $("#inputDriver").val();
    var driverID = $("#inputDriverID").val();
  var dendaType = $("#inputDendaType").val();
  var dendaMsg = $("#inputDenda").val();


  console.log(namaD + " "+ dendaType+ " "+dendaMsg );
  kirimPeringatan(driverID,namaD, dendaType,dendaMsg,telpPolisix, namaPolisix);
});



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

$("#btnDeleteDenda").click(function(){

var updates ={};
updates[$("#deleteIni").val()+'/status'] = "D";
return firebase.database().ref('drivers/'+idKhususSementara+'/').update(updates);
});



var warningRef = firebase.database().ref('drivers/'+idKhususSementara+'/');
warningRef.on('child_added', function(data) {
  $("#listPolisi").append(`<li>nama ${data.val().namaDriver}<br>id ${data.val().idDriver}
    <br>denda ${data.val().dendaDriver}
    <br>Message ${data.val().dendaMessage}
    <br>Telp ${data.val().telpPolisi}
    <br>NamaPolisi ${data.val().polisiNama}
    <br>Time ${data.val().time}
    <br>Status ${data.val().status}
    <br>Status ${data.key}</li>`);

});
