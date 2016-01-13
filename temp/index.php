<?php

    // include the facebook sdk
    require_once('php/facebook.php');

    // connect to app
    $config = array();
    $config['appId'] = '647207678755391';
    $config['secret'] = '59be331e39208086fd66d5c30e5b63fe';
    $config['fileUpload'] = false; // optional
    

    // instantiate
    $facebook = new Facebook($config);

    // set page id
    $pageid = "147513818956534";

    $info = array('user' => 'test1');
    $data = array();

    // now we can access various parts of the graph, starting with the feed
    $pagefeed = $facebook->api("/" . $pageid . "/feed");

    echo $pagefeed;
            
?>