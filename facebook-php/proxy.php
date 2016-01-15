<?php
define('FACEBOOK_SDK_V5_SRC_DIR', __DIR__ . '/facebook-sdk-v5/');
require_once(__DIR__ . '/facebook-sdk-v5/autoload.php');
header('Content-Type: application/json');

//App Info, needed for Auth
$app_id = '647207678755391';
$app_secret = '59be331e39208086fd66d5c30e5b63fe';

// set page id
$pageid = '147513818956534';

$fb = new Facebook\Facebook([
	'app_id' => $app_id,
	'app_secret' => $app_secret,
	'default_graph_version' => 'v2.5',
]);

$token = 'CAAJMocfJwj8BAIZCdERPi0vAD23BZCv8soKBZASh9BAZAUijTFsgdj0oOedaE9rPwjARhAaAaj03ZAIQwCEXffMjQCs0LxgQCvmXZA0p8Pa1o9wjZBLgj3TevIZCKzZCIgnITPSjo4s4hdnjk2tiQaTe95zxLJ8Yezg9i8ZCedNsR9aVuDmMGaroyZA';

$fb->setDefaultAccessToken($token);

try {
	$response = $fb->get('/me');#'/' . $pageid . '/feed');
	$object = $response->getGraphObject();
	echo $response;
} catch(Facebook\Exceptions\FacebookResponseException $e) {
	echo 'failed';
	echo $e;
}

?>