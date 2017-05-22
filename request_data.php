<?php
session_start();

$_SESSION['toke']['token'] = 'ul5EZhayq6VV4ipGLB9Z';
$_SESSION['toke']['exp'] = 1495540800;

if(isset($_GET['getData'])){
  if(!isset($_GET['suffix']))
  die('{\'error\': \'Please specify directory\'}');

  dataFetch($_GET['suffix']);
}

// function requestToke(){
//   curl_setopt_array($curl, array(
//     CURLOPT_URL => "http://52.69.117.50:27020/oauth2-api/p/v1/token?grant_type=client_credentials&scope=vehicle_telematics_data%2Borganization%2Bauto_vehicle%2Bdriver%2Bdriver_vehicle_relationship%2Btrip%2Balarm_event",
//     CURLOPT_RETURNTRANSFER => true,
//     CURLOPT_TIMEOUT => 30,
//     CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
//     CURLOPT_CUSTOMREQUEST => "POST",
//     CURLOPT_HTTPHEADER => array(
//       "Content-Type: application/x-www-form-urlencoded",
//       "Authorization: Basic YXV0b19jb25uZWN0X2FwcEBhdXRvX2Nvbm5lY3Rfc3A6YXBwMTIzYXV0b2Nvbm5lY3Q="
//     ),
//   ));
//
//   $response = curl_exec($curl);
//   $err = curl_error($curl);
//
//   curl_close($curl);
//
//   die($response);
// }

function dataFetch($suffix){
  $curl = curl_init();
  
  curl_setopt_array($curl, array(
    CURLOPT_URL => "http://52.69.117.50:27170/occhub/proxy/fms-core/".$suffix,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array(
      "Authorization: Bearer ".$_SESSION['toke']['token'],
    ),
  ));

  $response = curl_exec($curl);
  $err = curl_error($curl);

  curl_close($curl);

  die($response);
}
?>
