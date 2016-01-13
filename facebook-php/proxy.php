<?php
require_once __DIR__ . '/Facebook/autoload.php';

//App Info, needed for Auth
$app_id = '647207678755391';
$app_secret = '59be331e39208086fd66d5c30e5b63fe';

// set page id
$pageid = '147513818956534';

$fb = new Facebook\Facebook([
	'app_id' => '{app-id}',
	'app_secret' => '{app-secret}',
	'default_graph_version' => 'v2.5',
]);

$token = '';

try {
	$response = $fb->get('/oauth/access_token?type=client_cred&client_id={$app_id}&client_secret={$app_secret}');
	$token = $response;
} catch(Facebook\Exceptions\FacebookResponseException $e) {
	echo $e;
}

$fb->setDefaultAccessToken("{token}");

try {
	$response = $fb->get('/' . $pageid . '/feed');
	echo $response;
} catch(Facebook\Exceptions\FacebookResponseException $e) {
	echo $e;
}

?>