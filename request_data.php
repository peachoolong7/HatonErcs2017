<?php
session_start();

$_SESSION['toke']['token'] = '2fiJnFfhOACPIWDQG8xo';
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
  // var_dump($_REQUEST);
  // die();
  $curl = curl_init();

  curl_setopt_array($curl, array(
    CURLOPT_URL => "http://52.69.117.50:27170/occhub/proxy/".urldecode($suffix),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => $_POST['method'],
    CURLOPT_POSTFIELDS => $_POST['data'],
    CURLOPT_HTTPHEADER => array(
      "Authorization: Bearer ".$_SESSION['toke']['token'],
      'Content-Type: application/scim+json',
      'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      'Accept: '. $_POST['acc_enc'],
      'Connection: keep-alive',
      'Cache-Control: no-cache',
      'DNT: 1',
      'Accept-Language: en-US,en;q=0.8',
      'Content-Length: '.strlen($_POST['data'])
    ),
  ));

  $response = curl_exec($curl);
  $err = curl_error($curl);

  curl_close($curl);
  // var_dump($response);
  die($response);
}
?>
