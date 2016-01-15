<?php
// always add this header to ensure the JSON is output in the correct format
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Cache-Control: no-cache");
header("Pragma: no-cache");
header('Content-Type: application/json; charset=utf-8'); 

// $_JSON = json_decode(file_get_contents("php://input"), true);

$pageid = '147513818956534';
$authToken = 'access_token=CAAJMocfJwj8BAIZCdERPi0vAD23BZCv8soKBZASh9BAZAUijTFsgdj0oOedaE9rPwjARhAaAaj03ZAIQwCEXffMjQCs0LxgQCvmXZA0p8Pa1o9wjZBLgj3TevIZCKzZCIgnITPSjo4s4hdnjk2tiQaTe95zxLJ8Yezg9i8ZCedNsR9aVuDmMGaroyZA';
$fields = array(
	0 => 'name',
	1 => 'description',
	2 => 'cover'
);
$edges = array(
	0 => 'picture',
	1 => 'posts'
);
$graphField = "https://graph.facebook.com/" . $pageid . "?fields=" . $field . "&" . $authToken;
$graphEdge = "https://graph.facebook.com/" . $pageid . "/" . $edge . "?" . $authToken;

//Echo back json to read client side.
echo $graphField;
echo '<br>';
$field = $fields[0];
echo fetchUrl("{$graphField}");
echo '<br>';
echo '<br>';
$field = 'cover';
echo fetchUrl("{$graphField}");

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