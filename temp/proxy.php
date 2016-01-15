<?php
// always add this header to ensure the JSON is output in the correct format
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Cache-Control: no-cache");
header("Pragma: no-cache");
header('Content-Type: application/json; charset=utf-8'); 

$_JSON = json_decode(file_get_contents("php://input"), true);

$pageid = '147513818956534';

$graphUrl = "https://graph.facebook.com/" . $pageid . "/feed/";

//App Info, needed for Auth
$app_id = "647207678755391";
$app_secret = "59be331e39208086fd66d5c30e5b63fe";

//retrieve auth token
$authToken = 'CAAJMocfJwj8BAIZCdERPi0vAD23BZCv8soKBZASh9BAZAUijTFsgdj0oOedaE9rPwjARhAaAaj03ZAIQwCEXffMjQCs0LxgQCvmXZA0p8Pa1o9wjZBLgj3TevIZCKzZCIgnITPSjo4s4hdnjk2tiQaTe95zxLJ8Yezg9i8ZCedNsR9aVuDmMGaroyZA';

//Echo back json to read client side.
echo fetchUrl("{$graphUrl}?{$authToken}");

function fetchUrl($url){
    $ch = curl_init();
    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);
    $retData = curl_exec($ch);
    curl_close($ch); 
    return $retData;
}
?>