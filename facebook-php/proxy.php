<?php
require_once __DIR__ . '/Facebook/autoload.php';
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

$token = $app_id . '|' . $app_secret;

$fb->setDefaultAccessToken($token);

try {
	$response = $fb->get('/' . $pageid . '/feed');
	$object = $response->getGraphObject();
	echo $response;
} catch(Facebook\Exceptions\FacebookResponseException $e) {
	echo 'failed';
	echo $e;
}

?>