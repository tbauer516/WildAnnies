<?php
define('FACEBOOK_SDK_V5_SRC_DIR', __DIR__ . '/facebook-sdk-v5/');
require_once(__DIR__ . '/facebook-sdk-v5/autoload.php');
header('Content-Type: application/json');
error_reporting(E_ALL);
echo 'after reporting';
//App Info, needed for Auth
$app_id = '647207678755391';
$app_secret = '59be331e39208086fd66d5c30e5b63fe';

// set page id
$pageid = '147513818956534';
echo 'before fb';
$fb = new Facebook\Facebook([
	'client_id' => '647207678755391',
	'app_secret' => '59be331e39208086fd66d5c30e5b63fe',
	'default_graph_version' => 'v2.5',
]);

$token = 'CAAJMocfJwj8BAIZCdERPi0vAD23BZCv8soKBZASh9BAZAUijTFsgdj0oOedaE9rPwjARhAaAaj03ZAIQwCEXffMjQCs0LxgQCvmXZA0p8Pa1o9wjZBLgj3TevIZCKzZCIgnITPSjo4s4hdnjk2tiQaTe95zxLJ8Yezg9i8ZCedNsR9aVuDmMGaroyZA';

$fb->setDefaultAccessToken($token);

echo 'before try';

try {
	$response = $fb->get('/me');#'/' . $pageid . '/feed');
	echo $response;
	$object = $response->getGraphObject();
	echo $object;
	echo 'after request';
} catch(Exception $e) {
	echo 'failed';
	echo $e;
}

?>